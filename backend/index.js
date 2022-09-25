const connectToMongo = require("./db")
const express = require("express")
const cors = require("cors")
const port = 5000


const app = express()
app.use(cors())
app.use(express.json())
connectToMongo()

app.use("/api/userAuth/",require("./routes/userAuth"))
app.use("/api/loans/",require("./routes/loans"))
app.use("/api/transactions",require("./routes/transactions"))
app.use("/api/wallet/",require("./routes/wallet"))

app.listen(port,()=>{
    console.log(`backend Listening at port ${port}`)
})


