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
            "asset_id": "e73219f2e2ca122648f6f70afb5f1575",
            "public_id": "dtswcb0k7chfecrams7m",
            "version": 1665422040,
            "version_id": "82f8553a4d32e9cc32809bffb9855241",
            "signature": "0606590936df1718804665a419399205e7de1496",
            "width": 338,
            "height": 320,
            "format": "jpg",
            "resource_type": "image",
            "created_at": "2022-10-10T17:14:00Z",
            "tags": [],
            "bytes": 17213,
            "type": "upload",
            "etag": "8fcf594f2a568046c91128915e9036c6",
            "placeholder": false,
            "url": "http://res.cloudinary.com/diggwedxe/image/upload/v1665422040/dtswcb0k7chfecrams7m.jpg",
            "secure_url": "https://res.cloudinary.com/diggwedxe/image/upload/v1665422040/dtswcb0k7chfecrams7m.jpg",
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