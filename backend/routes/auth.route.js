import express from 'express';

import { register, login, logout} from '../controllers/auth.controller.js';
const router = express.Router();

router.get('/api/auth/register', register);
router.get('/api/auth/login', login);
router.get('/api/auth/logout', logout);



export default router;