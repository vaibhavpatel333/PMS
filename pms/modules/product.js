var express = require('express')
var router = express.Router()
var mongoose = require('mongoose')
require('./connection');


var productSchema = new mongoose.Schema({

    productName: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true
    },
    quantity: {
        type: Number,
        required: true
    },
    image:{
        type:String,
        // required: true
    },
    date: {
        type: Date,
        default: Date.now
    }
})

var productModel = mongoose.model('Products',productSchema)


module.exports = productModel
