const mongoose = require('mongoose');
const ObjectId = mongoose.Schema.Types.ObjectId;

const OrderSchequema = new mongoose.Schema({
    status:String,
    deliveryDate:Date,
    image_path:String,
    products:[{
        type:ObjectId,
        ref:'Product'
    }]
}, { timestamps:true});

const Order = mongoose.model('Order', OrderSchequema);
module.exports = Order;