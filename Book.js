const mongoose = require('mongoose');

const BookSchema = new mongoose.Schema({
    bookID : { type: String, required:true,unique:true},
    title:{type:String, required: true},
    author:{type:String, required:true},
    category:{type:String,required:true,enum:["Technology","Fiction"]},
    price:{type:Number,required:true,min:0},
    availableCopies: {type:Number,required:true,min:0},
    isActive:{type:Boolean,default:true}
});

const Book = mongoose.model("Book",BookSchema,"books");
module.exports = {Book};