import { Router } from 'express';
import { logInfo } from '../middlewares/logMiddlewares.js';
import { postRegister, postLogin, getLogout, getInfo } from '../controllers/userController.js';
import multer from './../multer/multer.js';

const router = new Router();

router.get('/info', logInfo, getInfo)
router.post('/register', logInfo, multer.single('image'), postRegister);
router.post('/login', logInfo, postLogin);
router.get('/logout', logInfo, getLogout);

export default router;