const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name:{
        type:"String",
        required: true
    },
    mrp:{
        type:"Number",
        required: true
    },
    discount:{
        type:"Number",
        required: true
    },
    ShippingCharge:{
        type:"Number",
        required: true
    },
    TotalAmount:{
        type:"Number",
        required: true
    },
    image:{
        type:"Array",
    },
    description:{
        type:"String",
        required: true
    }

})



module.exports = mongoose.model('Product',productSchema)