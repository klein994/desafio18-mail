import { usersCollection, productsCollection, cartsCollection, ordersCollection } from './../connections/mongoose.js';
import daoUsers from './../daos/daoUsers.js'
import daoProducts from './../daos/daoProducts.js'
import daoCarts from './../daos/daoCarts.js'
import daoOrders from './../daos/daoOrders.js'
import mailer from './../mail/containerMailer.js'
import twilio from './../messages/containerTwilio.js'
import { mailSender, mailSenderPass, accountSid, authToken } from './../configs/config.js'

const users = new daoUsers(usersCollection);
const products = new daoProducts(productsCollection);
const carts = new daoCarts(cartsCollection);
const orders = new daoOrders(ordersCollection);
const mail = new mailer(mailSender, mailSenderPass);
const message = new twilio(accountSid, authToken);

export { 
    users,
    products,
    carts,
    orders,
    mail,
    message
};