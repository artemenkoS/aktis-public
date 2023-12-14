import { Router } from 'express';
import {
  createProcedure,
  getOneProcedure,
  getProcedures,
  updateProcedure,
  deleteProcedure,
} from '../controllers/procedure.controller';

import { isAuthed } from '../middlware/authMiddleware';

const router = Router();

router.post('/procedure', isAuthed, createProcedure);
router.get('/procedure', isAuthed, getProcedures);
router.get('/procedure/:id', isAuthed, getOneProcedure);
router.patch('/procedure/', isAuthed, updateProcedure);
router.delete('/procedure/:id', isAuthed, deleteProcedure);

export default router;
