const Order = require('../models/Order');
const transporter = require('../config/nodemailer');

const OrderController = {
    async insert(req,res) {
        try {
           req.body.status = "Pendiente";
           const order = await Order.create(req.body);
        //    await transporter.sendMail({
        //        to:
        //    })
           res.status(201).send(order)
        } catch (error) {
            console.error(error);
             res.status(500).send({
                 message:'Hubo un problema al crear el pedido.', 
                 error
            });
        }
    }
};

module.exports = OrderController;