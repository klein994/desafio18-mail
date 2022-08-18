import { products, carts } from './../daos/index.js';

export const getAll = async (req, res, next) => {
    try {
        const allProducts = await products.getAll();
        res.json(allProducts);
    } catch (err) {
        next(err);
    }
}

export const getById = async (req, res, next) => {
    try{
        const { id } = req.params;
        const product = await products.getById(id);
        res.json(product);
    } catch(err) {
        next(err);
    }
}

export const postSave = async (req, res, next) => {
    try{
        const { body } = req;
        const product = await products.save(body);
        res.json(product);
    } catch(err) {
        next(err);
    }
}

export const putUpdate = async (req, res, next) => {
    try{
        const { id } = req.params;
        const { body } = req;
        body._id = id;
        const product = await products.updateById(body);
        res.json(product);
    } catch(err) {
        next(err);
    }
}

export const deleteById = async (req, res, next) => {
    try{
        const { id } = req.params;
        const product = await products.deleteById(id);
        const allCarts = await carts.getAll();
        await allCarts.forEach(async item => {
            item.products = item.products.filter(product => product.productId != id);
            await carts.updateById(item);
        });
        res.json(product);
    } catch(err) {
        next(err);
    }
}

export const deleteAll = async (req, res, next) => {
    try{
       await products.deleteAll();
        const allCarts = await carts.getAll();
        await allCarts.forEach(async item => {
            item.products = [];
            await carts.updateById(item);
        });
        res.json({ message: 'All products deleted' });
    } catch(err) {
        next(err);
    }
}
