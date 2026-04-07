// routes/benchmarkRoutes.js
import express from 'express';
import { compareSoftwares } from '../controllers/benchmarkController.js';
import multer from 'multer';
import path from 'path';
import fs from 'fs';

const uploadDir = path.join(process.cwd(), 'temp');
if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir);
const storage = multer.diskStorage({
	destination: (req, file, cb) => cb(null, uploadDir),
	filename: (req, file, cb) => cb(null, Date.now() + '-' + file.originalname)
});
const upload = multer({ storage });

const router = express.Router();

router.post('/benchmark', upload.fields([
	{ name: 'softwareA', maxCount: 1 },
	{ name: 'softwareB', maxCount: 1 }
]), compareSoftwares);

export default router;
