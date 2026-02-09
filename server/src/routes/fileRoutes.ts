// server/src/routes/fileRoutes.ts

import { Router } from 'express';
import { protect } from '../middlewares/auth.middleware';
import { upload } from '../config/multer';
import { uploadFile, getFiles, getFileById, deleteFile } from '../controllers/fileController';

const router = Router();

// Protect all routes
router.use(protect);

// File routes
router.post('/upload', upload.single('file'), uploadFile);
router.get('/', getFiles);
router.get('/:id', getFileById);
router.delete('/:id', deleteFile);

export default router;