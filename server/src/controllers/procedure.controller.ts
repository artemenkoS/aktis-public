import { Request, Response } from 'express';

import db from '../db';

export const createProcedure = async (req: Request, res: Response) => {
  const { procedure } = req.body;

  if (!procedure) {
    res.status(400).json('Не все обязательные поля заполнены');
    return;
  }

  try {
    const newProcedure = await db.query(`INSERT INTO procedure (procedire) values ($1) RETURNING *`, [procedure]);

    return res.status(201).json({
      message: 'Процедура успешно создан.',
    });
  } catch (error) {
    console.error('Ошибка при создании процедуры:', error);
    return res.status(500).json('Ошибка при создании процедуры');
  }
};

export const getProcedures = async (req: Request, res: Response) => {
  try {
    const page = req.query.page ? +req.query.page : 1;
    const pageSize = req.query.pageSize ? +req.query.pageSize : 10;
    const offset = (page - 1) * pageSize;

    const result = await db.query(`SELECT * FROM procedure LIMIT $1 OFFSET $2`, [pageSize, offset]);

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
    console.error('Произошла ошибка при получении списка процедур:', error);
    res.status(500).json({ message: 'Произошла ошибка при получении списка процедур' });
  }
};

export const getOneProcedure = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const procedure = await db.query(`SELECT * FROM procedure where id = $1`, [id]);
    if (!procedure.rows[0]) {
      res.status(404).json({ message: 'Процедура не найдена.' });
    } else {
      res.status(200).json({ data: procedure.rows[0] });
    }
  } catch (error) {
    console.error('Что-то пошло не так');
    res.status(500).json({
      message: 'Произошла ошибка при получении информации о процедуре',
    });
  }
};

export const updateProcedure = async (req: Request, res: Response) => {
  const { procedure, id } = req.body;

  try {
    const newProcedure = await db.query(`UPDATE procedure set procedure =  $1 where id = $2 RETURNING *`, [
      procedure,
      id,
    ]);

    res.status(201).json({
      patient: newProcedure.rows[0],
      message: 'Данные процедуры успешно изменены.',
    });
  } catch (error) {
    console.error('Ошибка при создании пациента:', error);
    res.status(500).json({ message: 'Произошла ошибка при создании пациента' });
  }
};

export const deleteProcedure = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const procedure = await db.query(`DELETE FROM procedure where id = $1`, [id]);
    if (procedure.rowCount === 0) {
      res.status(404).json({ message: 'Процедура не найдена.' });
    } else {
      res.status(200).json({ message: 'Процедура успешно удалена' });
    }
  } catch (error) {
    console.error('Что-то пошло не так', error);
    res.status(500).json({ message: 'Произошла ошибка при удалении процедуры.' });
  }
};
