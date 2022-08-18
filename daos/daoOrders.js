import container from "./../containers/containerMongoose.js";

class daoOrders extends container{
    constructor(collection) {
        super(collection)
    }
    async getOrderByUserId(userId) {
        const order = await this.collection.findOne({ userId })
                                           .populate('products.productId', { "__v": 0, "stock": 0 })
                                           .populate('userId', { "__v": 0, "password": 0 })
                                           .lean();
        return order;
    }
    async acceptOrder(userId) {
        try {
            const order = await this.collection.findOne({ userId });
            if(!order) { throw new Error('Order not found'); }
            if(order.accepted) { throw new Error('Order already accepted'); }
            await this.collection.updateOne({ userId }, { $set: { accepted: true } });
            const orderModified = await this.getOrderByUserId(userId);
            orderModified.products.forEach(element => {
                Object.keys(element.productId).forEach(key => {
                    element[key] = element.productId[key];
                });
                delete(element.productId);
            });
            return orderModified;
        } catch(err) {
            throw err;
        }
    }
}

export default daoOrders;