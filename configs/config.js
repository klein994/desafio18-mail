import { dev } from './../args/args.js';
import path from 'path';
import dotenv from 'dotenv';
import MongoStore from 'connect-mongo';
import mongoose from "mongoose"

if(dev){
    const __dirname = process.cwd();
    dotenv.config({
        path: path.resolve(__dirname, 'configs/config.env')
    })
}

export const mongoUrl = process.env.MONGOURL;
export const mongoOptions = JSON.parse(process.env.MONGOOPTIONS);
export const adminMail = process.env.ADMINMAIL;
export const mailSender = process.env.MAILSENDER;
export const mailSenderPass = process.env.MAILSENDERPASS;
export const mailReceiver = process.env.MAILRECEIVER;
export const ownWeb = process.env.OWNWEB;
export const accountSid = process.env.ACCOUNTSID;
export const authToken = process.env.AUTHTOKEN;
export const twilioNumber = process.env.TWILIONUMBER;
export const whatsappReceiver = process.env.WHATSAPPRECEIVER;

export const mongoStore = {
    store: MongoStore.create({
        mongoUrl: mongoUrl,
        mongoOptions: mongoOptions
    }),
    secret: process.env.MONGOSECRET,
    resave: eval(process.env.MONGORESAVE),
    saveUninitialized: eval(process.env.MONGOSAVEUNINITIALIZED),
    cookie: {
        maxAge: eval(process.env.MONGOCOOKIEMAXAGE)
    }
}

export const mongooseConfig = {
    collections: {
        users: {
            name: "users",
            schema: {
                email: { type: String, required: true },
                password: { type: String, required: true },
                name: { type: String, required: true },
                lastname: { type: String, required: true },
                address: { type: String, required: true },
                age: { type: Number, required: true },
                phone: { type: String, required: true },
                image: { type: String },
                avatar: { type: String }
            }
        },
        products: {
            name: "products",
            schema: {
                name: { type: String, require: true },
                price: { type: Number, require: true },
                image: { type: String, require: true },
                description: { type: String, require: true },
                stock: { type: Number, require: true }
            }
        },
        carts: {
            name: "carts",
            schema: {
                userId: { type: mongoose.Schema.Types.ObjectId, ref: "users" },
                products: {
                    type: [{
                            productId: { type: mongoose.Schema.Types.ObjectId, ref: "products" },
                            quantity: { type: Number }
                    }],
                    default: [],
                }
            }
        },
        orders: {
            name: "orders",
            schema: {
                userId: { type: mongoose.Schema.Types.ObjectId, ref: "users" },
                products: {
                    type: [{
                            productId: { type: mongoose.Schema.Types.ObjectId, ref: "products" },
                            quantity: { type: Number }
                    }],
                    default: []
                },
                total: { type: Number, default: 0 },
                accepted: { type: Boolean, default: false }
            }
        }
    }
}

