const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const AddItemSchema = Schema({
    Item:String,
    Brand:String,
    Stock:Number,
    SalePrice:Number,
    AddBy:String,
    AddOn:String
});

module.exports = mongoose.model("Items",AddItemSchema)  