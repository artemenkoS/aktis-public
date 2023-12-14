import { Request, Response } from 'express';

import db from '../db';

export const getNotifications = async (req: Request, res: Response) => {
  try {
    const id = req.query.id;
    console.log(req.socket.remoteAddress);

    const today = new Date().toISOString().split('T')[0];

    const result = await db.query(
      `SELECT * FROM notification 
  WHERE "recipentId" = $1 AND DATE("visitDate") = $2`,
      [id, today]
    );

    res.status(200).json({
      data: result.rows,
    });
  } catch (error) {
    console.error('Произошла ошибка при получении уведомлений', error);
    res.status(500).json({ message: 'Произошла ошибка при получении уведомлений' });
  }
};

export const markNotificationsAsRead = async (req: Request, res: Response) => {
  try {
    const ids: string[] = req.body.ids.toString().split(',');

    const placeholders = ids.map((_, index) => `$${index + 1}`).join(',');

    await db.query(
      `
        UPDATE notification
        SET "isViewed" = true
        WHERE id IN (${placeholders})
      `,
      ids
    );
    res.status(200).json({ message: 'Уведомления успешно обновлены' });
  } catch (error) {
    console.error('Произошла ошибка при обновлении уведомлений', error);
    res.status(500).json({ message: 'Произошла ошибка при обновлении уведомлений' });
  }
};
