const express = require("express")
const fetchVendor = require("../middleware/fetchVendor")
const loanmodel = require("../model/Loans")
const vendormodel = require("../model/Vendor")
const fetchLender = require("../middleware/fetchLender")

const router = express.Router()


router.delete("/delete/:id",fetchVendor,async(req,res)=>{
    try{

        const loanid = req.params.id
        const deleted = await loanmodel.findByIdAndDelete(loanid)

        if(!deleted) return res.json({msg:"Loan Request Could not be deleted"})
        return res.json({msg:"Loan Request deleted!"})
    }catch(e){res.status(500).json({msg:"server crashed"})}
})


router.post("/create", fetchVendor, async (req, res) => {
    try {
        const user = await vendormodel.findById(req.id)
        const { tenure, amount } = req.body
        const create = await loanmodel.create({
            tenure, amount, vendorid: req.id,vendorname:user.username
        })

        if (!create) return res.json({ msg: "loan not posted" })

        return res.json({ msg: "loan request posted!" })
    }catch(e){res.status(500).json({msg:"server crashed"})}
})


router.get("/fetchuserloan", fetchVendor, async (req, res) => {
    try {
        const found = await loanmodel.find({
            vendorid: req.id
        })

        if (!found) return res.json({ msg: "no loans" })

        return res.json(found)
    }catch(e){res.status(500).json({msg:"server crashed"})}
})

router.get("/fetchloans", fetchVendor, async (req, res) => {
    try {
        const found = await loanmodel.find().sort({timestamp:-1})
        if (!found) return res.json({ msg: "no loans" })

        return res.json(found)
    }catch(e){res.status(500).json({msg:"server crashed"})}
})

router.put("/updateAmountEmi",fetchLender,async(req,res)=>{
    
    try{

        
        const {totalamount,emi,loanid}= req.body
        
        const updated  = await loanmodel.updateOne({loanid},{
            totalamount,emi,lenderid:req.id
        })

        if(!updated) return res.json("could not update")

        return res.json({msg:"updated!"})
    }catch(e) {return res.json({msg:"Server Crashed"})}
} )

module.exports = router