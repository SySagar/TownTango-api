import { Router } from 'express';
const router = Router();
import { signup , login } from '../controllers/auth.controller.js';

router.post('/signup', signup);
router.post('/login', login);

export default router;
