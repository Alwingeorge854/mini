const mongoose = require("mongoose")

const loanSchema = new mongoose.Schema({

    timestamp: {
        type: Date,
        default: Date.now
    },

    vendorid: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "vendors",
        default: null
    },

    vendorname:{
        type:String,
        default:null
    },

    amount: {
        type: Number,
        required: true,
        default: null
    },

    lenderid: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "lenders",
        default: null
    },

    interest: {
        type: Number,
        default: null
    },

    tenure: {
        type: Number,
        required: true,
        default: null
    },

    totalamount: {
        type: Number,
        default: 0
    },

    emi:{
        type: Number,
        default: 0
    },

    

})

module.exports = mongoose.model("loans", loanSchema)