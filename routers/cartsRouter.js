import { Router } from 'express';
import { auth } from './../middlewares/authMiddlewares.js';
import { postProductToCart, getProductsFromCart, deleteProductFromCart } from './../controllers/cartsController.js';
import { logInfo } from '../middlewares/logMiddlewares.js';

const router = Router();

router.post('/', auth, logInfo, postProductToCart);
router.get('/', auth, logInfo, getProductsFromCart)
router.delete('/', auth, logInfo, deleteProductFromCart);

export default router;