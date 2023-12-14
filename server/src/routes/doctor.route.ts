import { Router } from 'express';
import { getDoctors, getOneDoctor } from '../controllers/doctor.controller';

import { isAuthed } from '../middlware/authMiddleware';

const router = Router();

router.get('/doctor', isAuthed, getDoctors);
router.get('/doctor/:id', isAuthed, getOneDoctor);

export default router;
