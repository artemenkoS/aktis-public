import { Request, Response, NextFunction } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import db from '../db';
import { config } from '../config';

const generateAccessToken = (id: string, role: string) => {
  const payload = { id: id, role: role };
  return jwt.sign(payload, config.secretKey, { expiresIn: '10h' });
};

export const registerUser = async (req: Request, res: Response, next: NextFunction) => {
  const { login, password, role = 1, name, surname } = req.body;

  if (!login || !password) {
    res.status(400).json('Не все обязательные поля заполнены');
    return;
  }

  try {
    const candidate = await db.query(`SELECT * FROM users WHERE login = $1`, [login]);

    if (candidate.rows.length > 0) {
      res.status(400).json('Пользователь с таким логином уже существует');
      return;
    }

    const hashedPassword = await bcrypt.hash(password, 5);

    await db.query(`INSERT INTO users (login, password, name, surname, role) values ($1, $2, $3, $4, $5) RETURNING *`, [
      login,
      hashedPassword,
      name,
      surname,
      role,
    ]);

    res.status(201).json({
      message: 'Пользователь успешно создан.',
    });
  } catch (error) {
    console.error('Ошибка при создании пользователя:', error);
    res.status(500).json({ message: 'Произошла ошибка при создании пользователя' });
  }
};

export const loginUser = async (req: Request, res: Response, next: NextFunction) => {
  const { login, password } = req.body;

  if (!login || !password) {
    res.status(400).json({ message: 'Не все обязательные поля заполнены' });
    return;
  }

  try {
    const user = await db.query(`SELECT * FROM users WHERE login = $1`, [login]);

    if (user.rows.length === 0) {
      return res.status(400).json({ message: 'Пользователь не найден' });
    }

    const validPassword = bcrypt.compareSync(password, user.rows[0].password);

    if (!validPassword) {
      return res.status(403).json({ message: 'Не удалось авторизоваться.' });
    }

    const token = generateAccessToken(user.rows[0].id, user.rows[0].role);

    return res.status(200).json({
      message: 'Успешная авторизация.',
      token: token,
      data: {
        id: user.rows[0].id,
        role: user.rows[0].role,
      },
    });
  } catch (error) {
    console.error('Ошибка авторизации', error);
    res.status(500).json({ message: 'Ошибка авторизации' });
  }
};
