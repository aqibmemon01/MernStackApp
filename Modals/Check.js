const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CheckData = Schema({
    Data1:String,
    Data2:Number,
});

module.exports = mongoose.model("Check4",CheckData)