const mongoose = require('mongoose')

const BidsSchema = mongoose.Schema({
    biderId: {
        type : String,
        required : true
    },
    biderName: {
        type : String,
        required : true
    },
    bidDate: {
        type : String,
        required : true
    },
    price: {
        type : String,
        required : true
    },
    productId:{
        type : String,
        required : true 
    }
})

const Bids = mongoose.model('bids', BidsSchema)
module.exports = Bids