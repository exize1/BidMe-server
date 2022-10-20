const mongoose = require('mongoose')


const ProductSchema = mongoose.Schema({

    userId: {
        type : String,
        required : true
    },
    image: {
        type : Object,
        required : true
    },
    productName: {
        type : String,
        required : true
    },
    category: {
        type : String,
        required : true
    },
    description: {
        type : String,
        required : true
    },
    initialPrice: {
        type : String,
        required : true
    },
    latestPrice: {
        type : String,
        required : true
    },
    numberOfBids: {
        type : Number,
        required : true
    },
    initialDate: {
        type : String,
        required : true
    },
    endingDate: {
        type : String,
        required : true
    },
    hasEnded: {
        type : Boolean,
        required : true
    }
})

const Product = mongoose.model('product', ProductSchema)
module.exports = Product