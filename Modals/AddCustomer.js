const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const AddCustomerSchema = Schema({
    Name:String,
    Address:String,
    Phone:Number,
    Opening:Number,
    AddBy:String,
    AddOn:String
});

module.exports = mongoose.model("Customers",AddCustomerSchema)