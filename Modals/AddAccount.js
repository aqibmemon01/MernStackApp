const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const AddAccSchema = Schema({
    Name:String,
    Opening:Number,
    AddBy:String,
    AddOn:String
});

module.exports = mongoose.model("Accounts",AddAccSchema)  