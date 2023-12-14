import { Request, Response } from 'express';

import db from '../db';

export const getRoles = async (req: Request, res: Response) => {
  try {
    const result = await db.query(`SELECT * FROM role`);

    res.status(200).json({
      data: result.rows,
    });
  } catch (error) {
    console.error('Произошла ошибка при получении ролей', error);
    res.status(500).json({ message: 'Произошла ошибка при получении ролей' });
  }
};
