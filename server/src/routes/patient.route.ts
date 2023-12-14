import { Router } from 'express';
import {
  createPatient,
  getPatients,
  getOnePatient,
  updatePatient,
  deletePatient,
} from '../controllers/patient.controller';

import { isAuthed } from '../middlware/authMiddleware';

const router = Router();

router.post('/patient', isAuthed, createPatient);
router.get('/patient', isAuthed, getPatients);
router.get('/patient/:id', isAuthed, getOnePatient);
router.patch('/patient/', isAuthed, updatePatient);
router.delete('/patient/:id', isAuthed, deletePatient);

export default router;
