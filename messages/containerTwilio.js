import twilio from 'twilio';
import logger from '../logs/logger.js';

class containerTwilio {
  constructor(accountSid, authToken) {
    this.client = twilio(accountSid, authToken);
  }
  async sendWhatsapp(to, from, body) {
    try {
        return await this.client.messages.create({
            from,
            to,
            body
        });
    } catch (error) {
        logger.error(`Error al Enviar: ${error.message}`);
        throw new Error(`Error al Enviar: ${error.message}`)
    }
  }
  async sendWhatsappAcceptingOrder(to, from, order) {
    try{
      let body = `Nuevo pedido de ${order.userId.name} ${order.userId.lastname}\n`
      body += `Name: ${order.userId.name}\n`
      body += `Lastname: ${order.userId.lastname}\n`
      body += `Email: ${order.userId.email}\n`
      body += `Phone: ${order.userId.phone}\n`
      body += `Age: ${order.userId.age}\n`
      body += `Address: ${order.userId.address}\n`
      body += `Products: \n`
      order.products.forEach(product => {
        body += `\n`;
        body += `           Name: ${product.name}\n`;
        body += `           Price: ${product.price}\n`;
        body += `           Quantity: ${product.quantity}\n`;
        body += `           Description: ${product.description}\n`;
        body += `\n`;
      })
      body += `Total: ${order.total}\n`;
      return await this.sendWhatsapp(to, from, body);
    } catch (error) {
      logger.error(`Error al Enviar: ${error.message}`);
      throw new Error(`Error al Enviar: ${error.message}`)
    }
  }
}

export default containerTwilio;