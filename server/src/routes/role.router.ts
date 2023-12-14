import { Router } from 'express';
import { getRoles } from '../controllers/role.controller';

import { isAuthed } from '../middlware/authMiddleware';

const router = Router();

router.get('/role', isAuthed, getRoles);

export default router;
