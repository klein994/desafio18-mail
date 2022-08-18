import container from "../containers/containerMongoose.js";

class daoCarts extends container{
    constructor(collection) {
        super(collection)
    }
    async getByUserId(userId) {
        try {
            const cart = await this.collection.findOne({ userId });
            if(!cart) { throw new Error('Cart not found'); }
            return cart;
        } catch(err) {
            throw err;
        }
    }
    async getProductsFromCart(userId) {
        const cart = await this.collection.findOne({ userId }, { "_id": 0, "userId": 0, "__v": 0, "products._id": 0 }).populate('products.productId', { "__v": 0, "stock": 0 }).lean();
        const products = cart.products;
        products.forEach(element => {
            Object.keys(element.productId).forEach(key => {
                element[key] = element.productId[key];
            });
            delete(element.productId);
        });
        return products;
    }
    async deleteProductsFromCart(userId) {
        try {
            const cart = await this.collection.findOne({ userId });
            if(!cart) { throw new Error('Cart not found'); }
            await this.collection.updateOne({ userId }, { $set: { products: [] } });
            return cart;
        } catch(err) {
            throw err;
        }
    }
}

export default daoCarts;