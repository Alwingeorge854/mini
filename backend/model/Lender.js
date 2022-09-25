const mongoose = require("mongoose")

const lenderSchema = new mongoose.Schema({

    username: {
        type: String,
        required: true,
    },

    password: {
        type: String,
        required: true
    },
    firstname: {
        type: String,
        default:null
       
    },
    lastname: {
        type: String,
        default:null
    },
    phonenumber: {
        type: Number,
        default:null
    },
    aadharnumber: {
        type: Number,
        default:null
    },
    pancardnumber: {
        type: String,
        default:null
    },
    lendercash: {
        type: Number,
        default:0
    },

    address: {
        type: String,
        default:null
    },

    timestamp: {
        type: Date,
        default: Date.now
    }
})

module.exports = mongoose.model("lenders",lenderSchema)