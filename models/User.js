const mongoose = require('mongoose');

const userSchequema = new mongoose.Schema({
    name:String,
    email:{
        type:String,
        unique:true,
        required:true
        },
    password:{
        type:String,
        required:true,
        minlength:8
        }
},{timestamps:true});

module.exports = mongoose.model('User', userSchequema);
