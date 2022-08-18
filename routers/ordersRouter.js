import { Router } from 'express';
import { auth } from './../middlewares/authMiddlewares.js';
import { generateOrder, getOrder, acceptOrder } from './../controllers/ordersController.js';

const router = Router();

router.post('/', auth, generateOrder);
router.get('/', auth, getOrder);
router.post('/accept' , auth, acceptOrder);


export default router;