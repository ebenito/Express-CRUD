const mongoose = require('mongoose');
const ObjectId = mongoose.Schema.Types.ObjectId;

const ProductSchequema = new mongoose.Schema({
    name:String,
    price:Number,
    image_path:String,
    categories:[{
        type:ObjectId,
        ref:'Category'
    }]
});

const Product = mongoose.model('Product', ProductSchequema);
module.exports = Product;