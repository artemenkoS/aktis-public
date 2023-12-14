import { Router } from 'express';
import { getNotifications, markNotificationsAsRead } from '../controllers/notification.controller';

import { isAuthed } from '../middlware/authMiddleware';

const router = Router();

router.get('/notification', isAuthed, getNotifications);

router.patch('/notification', isAuthed, markNotificationsAsRead);

export default router;
