import express from 'express';

import { register, login, logout, googleAuth, googleCallback } from '../controllers/authcontroller.js';
const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.post('/logout', logout);

// Google OAuth routes
router.get('/google', googleAuth);
router.get('/google/callback', googleCallback);

export default router;