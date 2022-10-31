const mongoose = require('mongoose')

const UsersSchema = mongoose.Schema({
    firstName: {
        type : String,
        required : true
    },
    lastName: {
        type : String,
        required : true
    },
    email: {
        type : String,
        required : true,
        unique: true
    },
    phone: {
        type : String,
    },
    password: {
        type : String,
        required : true
    },
    avatar: {
        type: Object,
        default: {
            "asset_id": "bcbf539f8f2fd8e7f77b15f5b9c1aff5",
            "public_id": "yzzf6ol9bbn6qkdhkhbl",
            "version": 1666461011,
            "version_id": "a14e67d266ab71b64649ee809fec336a",
            "signature": "9408d5ae30c4e64c351baba246916c5c93727af9",
            "width": 338,
            "height": 320,
            "format": "jpg",
            "resource_type": "image",
            "created_at": "2022-10-22T17:50:11Z",
            "tags": [],
            "bytes": 17213,
            "type": "upload",
            "etag": "8fcf594f2a568046c91128915e9036c6",
            "placeholder": false,
            "url": "http://res.cloudinary.com/diggwedxe/image/upload/v1666461011/yzzf6ol9bbn6qkdhkhbl.jpg",
            "secure_url": "https://res.cloudinary.com/diggwedxe/image/upload/v1666461011/yzzf6ol9bbn6qkdhkhbl.jpg",
            "folder": "",
            "access_mode": "public",
            "api_key": "151256711984297"
        }
     },
    loggedIn: {
        type: Boolean,
        default: false
    },
    CreditCard: {
        type: Object,
        default: {
            "cardNumber": "xxxx-xxxx-xxxx-xxxx",
            "month": "MM",
            "year": "YY",
            "cvv": "xxx",
            "idNumber": "xxxxxxxxxx"
        }
    }
})

const Users = mongoose.model('newUsers', UsersSchema)
module.exports = Users