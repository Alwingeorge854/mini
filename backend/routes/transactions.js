const express = require("express")
const router = express.Router()
const transactionmodel = require("../model/Transactions")
const loanmodel = require("../model/Loans")
const fetchVendor = require("../middleware/fetchVendor")
const fetchLender = require("../middleware/fetchLender")

router.post("/addTransaction",fetchVendor,async(req,res)=>{
    try{

        const {loanid} = req.body
        console.log(loanid)
        const findloan = await loanmodel.findById(loanid)
        
        const created = await transactionmodel.create({
            vendorid:req.id,totalamount:findloan.totalamount,emi:findloan.emi,loanid,lenderid:findloan.lenderid
        })
        
        if(!created) return res.json({msg:"transaction not started"}) 

        return res.json({msg:"Transaction Started!"})
    }catch(e){return res.status(500).json({msg:"Transaction could not commence"})}
})

router.delete("/deleteTransaction/:id",async(req,res)=>{
    try{

        const deleted = await transactionmodel.findByIdAndDelete(req.params.id)
        
        if(!deleted) return res.json({msg:"transaction not Completed"})

        return res.json({msg:"Transaction Completed!"})
    }catch(e){return res.status(500).json({msg:"Transaction could not Complete"})}
})

router.get("/fetchVendorTransactions",fetchVendor,async(req,res)=>{
    try{
        console.log("reached")
        const transactions = await transactionmodel.find({vendorid:req.id})
        console.log(transactions)
        return res.json(transactions)
    }catch(e){return res.status(500).json({msg:"Transaction could not Complete"})}
})


router.get("/fetchLenderTransactions",fetchLender,async(req,res)=>{
    try{

        const transactions = await transactionmodel.find({lenderid:req.id})

        return res.json(transactions)
    }catch(e){return res.status(500).json({msg:"Transaction could not Complete"})}
})
module.exports = router