import express from 'express';
import protectRoute from '../middleware/protectRoute.js';
import upload from '../middleware/upload.js';
import { getUsersForSidebar, updateProfilePicture } from '../controllers/usercontroller.js';

const router = express.Router();

router.get("/", protectRoute, getUsersForSidebar);
router.post("/upload-profile", protectRoute, upload.single('profilePic'), updateProfilePicture);

export default router;