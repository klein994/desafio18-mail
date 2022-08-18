import { createTransport } from 'nodemailer';
import handlebars from 'handlebars';
import fs from 'fs';
import logger from './../logs/logger.js';
import path from 'path';
import { ownWeb } from './../configs/config.js';

class mailer {
    constructor(user, pass) {
        this.transporter = createTransport({
            service: 'gmail',
            port: 587,
            auth: {
                user: user,
                pass: pass
            }
        })
    }
    async sendMail(mailOptions) {
        try {
            const info = await this.transporter.sendMail(mailOptions);
            return info;
        } catch (err) {
            logger.error(`Error al Enviar: ${err.message}`);
            throw new Error(`Error al Enviar: ${err.message}`)
        }
    }
    async sendMailInRegister(user, mail) {
        try {
            const html = generateHtml('./handlebars/register.handlebars', {
                title: "There is a New User Registered",
                name: user.name,
                lastname: user.lastname,
                email: user.email,
                age: user.age,
                phone: user.phone,
                address: user.address,
                image: user.image? ownWeb + user.image : user.avatar,
            })
    
            const mailOptions = {
                from: "Servidor NodeJS",
                to: mail,
                subject: "Nuevo registro",
                html: html
            }
            return this.sendMail(mailOptions);
        } catch (err) {
            logger.error(`Error al Enviar: ${err.message}`);
            throw new Error(`Error al Enviar: ${err.message}`)
        }
    }
    async sendMailInAccept(user, products, total, mail) {
        try {
            const html = generateHtml('./handlebars/accept.handlebars', {
                title: `Nuevo pedido de ${user.name} ${user.lastname}`,
                name: user.name,
                lastname: user.lastname,
                email: user.email,
                age: user.age,
                phone: user.phone,
                address: user.address,
                image: user.image? ownWeb + user.image : user.avatar,
                products: products,
                total: total
            })
    
            const mailOptions = {
                from: "Servidor NodeJS",
                to: mail,
                subject: "Orden Aceptada",
                html: html
            }
            return this.sendMail(mailOptions);
        } catch (err) {
            logger.error(`Error al Enviar: ${err.message}`);
            throw new Error(`Error al Enviar: ${err.message}`)
        }
    }
}

const generateHtml = (templatePath, data) => {
    const __dirname = process.cwd();
    const templateSource = fs.readFileSync(path.resolve(__dirname, templatePath), 'utf8');
    const template = handlebars.compile(templateSource);
    return template(data);
}

export default mailer;