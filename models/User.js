const mongoose = require('mongoose');

const userSchequema = new mongoose.Schema({
    email:String,
    password:String
},{timestamps:true});

module.exports = mongoose.model('User', userSchequema);
