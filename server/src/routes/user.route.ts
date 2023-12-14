import { Router } from 'express';
import { getUserFromToken, getUsers } from '../controllers/user.controller';

import { isAuthed } from '../middlware/authMiddleware';

const router = Router();

router.get('/user', isAuthed, getUserFromToken);
router.get('/users', isAuthed, getUsers);

export default router;
