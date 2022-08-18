import { carts, products } from './../daos/index.js';

export const postProductToCart = async (req, res, next) => {
    try{
        const { quantity, productId } = req.body;
        const product = await products.getById(productId);
        if(product.stock < quantity){
            res.status(400).send({ message: 'There is not stock enough' });
        } else {
            const cart = await carts.getByUserId(req.user._id)
            cart.products.push({
                productId,
                quantity
            });
            await carts.updateById(cart);
            product.stock = product.stock - quantity;
            await products.updateById(product);
            res.status(200).send({ message: 'Product added to cart' });
        }
    } catch(err) {
        next(err);
    }
}

export const getProductsFromCart = async (req, res, next) => {
    try{
        const cart = await carts.getProductsFromCart(req.user._id);
        res.status(200).send(cart);
    } catch(err) {
        next(err);
    }
}

export const deleteProductFromCart = async (req, res, next) => {
    try{
        const { productId } = req.body;
        const cart = await carts.getByUserId(req.user._id);
        const product = cart.products.find(product => product.productId == productId);
        if(!product){
            return res.status(400).send({ message: 'Product not found' });
        }
        const productToUpdate = await products.getById(productId);
        productToUpdate.stock = productToUpdate.stock + product.quantity;
        await products.updateById(productToUpdate);
        cart.products = cart.products.filter(product => product.productId != productId);
        await carts.updateById(cart);
        res.status(200).send(cart);
    } catch(err) {
        next(err);
    }
}