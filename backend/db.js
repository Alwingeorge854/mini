const mongoose = require("mongoose")

const URI = "mongodb://localhost:27017/LVMS"

const connectToMongo = ()=>{
    mongoose.connect(URI,()=>{
        console.log("connected to LVMS database")
    })
}

module.exports = connectToMongo