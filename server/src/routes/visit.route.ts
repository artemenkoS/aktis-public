import { Router } from 'express';
import { createVisit, getVisits, getOneVisit, deleteVisit, updateVisit } from '../controllers/visit.controller';

import { isAuthed } from '../middlware/authMiddleware';

const router = Router();

router.post('/visit', isAuthed, createVisit);
router.get('/visit', isAuthed, getVisits);
router.get('/visit/:id', isAuthed, getOneVisit);
router.patch('/visit/:id', isAuthed, updateVisit);
router.delete('/visit/:id', isAuthed, deleteVisit);

export default router;
