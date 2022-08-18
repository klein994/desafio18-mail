import { Router } from 'express';
import { auth, isAdmin } from './../middlewares/authMiddlewares.js';
import { getAll, getById, postSave, putUpdate, deleteById, deleteAll } from './../controllers/productsController.js';
import { logInfo } from '../middlewares/logMiddlewares.js';

const productsRouter = Router();

productsRouter.get('/', auth, logInfo, getAll);
productsRouter.get('/:id', auth, logInfo, getById);
productsRouter.post('/', isAdmin, logInfo, postSave);
productsRouter.put('/:id', isAdmin, logInfo, putUpdate);
productsRouter.delete('/:id', isAdmin, logInfo, deleteById);
productsRouter.delete('/', isAdmin, logInfo, deleteAll);

export default productsRouter;