const mongoose = require("mongoose")

const transactionSchema = new mongoose.Schema({
    vendorid: {
        type: String,
    
    },
    
    lenderid: {
        type: String,
      
    },

    loanid: {
        type: String
     
    },

    totalamount: {
        type: Number,
        default: 0
    },

    emi:{
        type: Number,
        default: 0
    },


    timestamp:{
        type:Date,
        default:Date.now
    }
})

module.exports = mongoose.model("transactions",transactionSchema)