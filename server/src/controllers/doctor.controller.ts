import { Request, Response } from 'express';

import db from '../db';

export const getDoctors = async (req: Request, res: Response) => {
  try {
    const page = req.query.page ? +req.query.page : 1;
    const pageSize = req.query.pageSize ? +req.query.pageSize : 10;
    const offset = (page - 1) * pageSize;

    const doctorRole = await db.query(`SELECT * FROM role WHERE role = 'doctor'`);

    const result = await db.query(`SELECT id, name, surname FROM users WHERE role = $3 LIMIT $1 OFFSET $2`, [
      pageSize,
      offset,
      doctorRole.rows[0].id,
    ]);

    const totalCountQuery = await db.query(`SELECT COUNT(*) FROM users WHERE role = $1`, [doctorRole.rows[0].id]);
    const totalCount = +totalCountQuery.rows[0].count;
    const totalPages = Math.ceil(totalCount / pageSize);

    res.status(200).json({
      data: result.rows,
      pagination: {
        currentPage: page,
        pageSize: pageSize,
        totalPages,
      },
    });
  } catch (error) {
    console.error('Произошла ошибка при получении списка докторов', error);
    res.status(500).json({ message: 'Произошла ошибка при получении списка докторов' });
  }
};

export const getOneDoctor = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;

    const user = await db.query(`SELECT id, name, surname, role FROM users WHERE id = $1`, [id]);

    if (!user.rows[0]) {
      return res.status(404).json({ message: 'Пользователь не найден.' });
    }

    const doctorRole = await db.query(`SELECT id FROM role WHERE role = 'doctor'`);

    if (doctorRole.rows[0].id !== user.rows[0].role) {
      return res.status(404).json({ message: 'Пользователь не является доктором.' });
    }

    res.status(200).json({ data: user.rows[0] });
  } catch (error) {
    console.error('Что-то пошло не так:', error);
    res.status(500).json({ message: 'Произошла ошибка при получении информации о докторе' });
  }
};
