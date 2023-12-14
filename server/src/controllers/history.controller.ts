import { Request, Response } from 'express';

import db from '../db';
import { wss, CustomWebSocket } from '../index';

const sendMessage = (message: string) => {
  wss.clients.forEach((client: CustomWebSocket) => {
    client.send(message);
  });
};

export const createLogRecord = async (req: Request, res: Response) => {
  const { authorId, doctorId, changes, visitDate, status, createdAt } = req.body;

  if (!authorId || !doctorId || !visitDate || !status) {
    res.status(400).json('Не все обязательные поля заполнены');
    return;
  }

  try {
    const newLogRecord = await db.query(
      `INSERT INTO history ("authorId", "doctorId", "visitDate", "changes", "status", "createdAt") values ($1, $2, $3, $4, $5, $6) RETURNING *`,
      [authorId, doctorId, visitDate, changes, status, createdAt]
    );

    if (status === 'delete') {
      sendMessage(JSON.stringify({ type: 'cancelledVisit', visitDate, authorId, doctorId }));
      doctorId !== authorId &&
        (await db.query(
          `INSERT INTO notification ("isViewed","recipentId","createdAt","type", "visitDate") values ($1, $2, $3, $4, $5) RETURNING *`,
          [false, doctorId, new Date(), 'cancelledVisit', visitDate]
        ));
    }

    res.status(201).json({
      log: newLogRecord.rows[0],
    });
  } catch (error) {
    console.error('Ошибка при записи в историю:', error);
    res.status(500).json('Произошла ошибка при записи в историю');
  }
};

export const getHistory = async (req: Request, res: Response) => {
  try {
    const page = req.query.page ? +req.query.page : 1;
    const pageSize = req.query.pageSize ? +req.query.pageSize : 10;
    const offset = (page - 1) * pageSize;

    const sort = req.query.sort as string;

    let sortQuery = ` ORDER BY "createdAt" DESC`;

    if (sort) {
      const sortItems = JSON.parse(sort);
      if (Array.isArray(sortItems) && sortItems.length > 0) {
        sortQuery = '';
        sortItems.forEach((item: { field: string; sort: string }, index: number) => {
          if (index === 0) {
            sortQuery += ` ORDER BY "${item.field}" ${item.sort}`;
          } else {
            sortQuery += `, ${item.field} ${item.sort}`;
          }
        });
      }
    }

    let query = `SELECT * FROM history${sortQuery} LIMIT $1 OFFSET $2`;

    const result = await db.query(query, [pageSize, offset]);

    const totalCountQuery = await db.query(`SELECT COUNT(*) FROM history`);
    const totalCount = +totalCountQuery.rows[0].count;
    const totalPages = Math.ceil(totalCount / pageSize);

    res.status(200).json({
      data: result.rows,
      pagination: {
        currentPage: page,
        pageSize: pageSize,
        totalPages,
        totalCount,
      },
    });
  } catch (error) {
    console.error('Произошла ошибка при получении истории изменений', error);
    res.status(500).json({ message: 'Произошла ошибка при получении истории изменений' });
  }
};
