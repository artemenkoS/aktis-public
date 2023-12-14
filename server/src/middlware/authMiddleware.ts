import { Request, Response, NextFunction } from 'express';

import { config } from '../config';
import jwt from 'jsonwebtoken';

export const isAuthed = (req: Request, res: Response, next: NextFunction) => {
  if (req.method === 'OPTIONS') {
    next();
  }

  try {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
      return res.status(401).json({ message: 'Пользователь не авторизован' });
    }
    const decodedToken = jwt.verify(token, config.secretKey);
    res.locals.user = decodedToken;
    next();
  } catch (error) {
    return res.status(401).json({ message: 'Пользователь не авторизован' });
  }
};
