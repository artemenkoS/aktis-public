import { Request, Response } from 'express';
import db from '../db';

export const getUserFromToken = (req: Request, res: Response) => {
  const user = res.locals.user;

  res.status(200).json({ user });
};

export const getUsers = async (req: Request, res: Response) => {
  try {
    const page = req.query.page ? +req.query.page : 1;
    const pageSize = req.query.pageSize ? +req.query.pageSize : 10;
    const offset = (page - 1) * pageSize;

    const result = await db.query(`SELECT name,surname,id,role FROM users LIMIT $1 OFFSET $2`, [pageSize, offset]);

    const totalCountQuery = await db.query(`SELECT COUNT(*) FROM procedure`);
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
    console.error('Произошла ошибка при получении списка пользователей:', error);
    res.status(500).json({ message: 'Произошла ошибка при получении списка пользователей' });
  }
};
