import { Router } from 'express';
import { createLogRecord, getHistory } from '../controllers/history.controller';

import { isAuthed } from '../middlware/authMiddleware';

const router = Router();

router.post('/history', isAuthed, createLogRecord);
router.get('/history', isAuthed, getHistory);

export default router;
