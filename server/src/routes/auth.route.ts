import { Router } from 'express';
import { registerUser, loginUser } from '../controllers/auth.controller';

const router = Router();

router.post('/auth/reg', registerUser);
router.post('/auth/', loginUser);

export default router;
