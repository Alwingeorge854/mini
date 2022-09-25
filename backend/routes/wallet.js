const express = require("express")
const lendermodel = require("../model/Lender")
const vendormodel = require("../model/Vendor")
const fetchLender = require("../middleware/fetchLender")
const fetchVendor = require("../middleware/fetchVendor")

const router= express.Router()

router.put("/depositLender",fetchLender,async(req,res)=>{
    
    try{
        lenderid=req.id
        const {lendercash}= req.body
        const find = await lendermodel.findOne({lenderid})
        if(!find) return res.json({msg:"This user doesnt exist"})
        console.log(find)
        const updated  = await lendermodel.updateOne({lenderid},{
            lendercash:find.lendercash+lendercash,lenderid
        })

        
        if(!updated) return res.json("could not deposit")

        return res.json({msg:"deposited!"})
    }catch(e) {return res.json({msg:"Server Crashed"})}
} )

router.put("/withdrawLender",fetchLender,async(req,res)=>{
    
    try{
        
        let li = req.id
        const {lendercash,lenderid}= req.body
        li=lenderid
        const find = await lendermodel.findOne({li})
       
        if(!find) return res.json({msg:"This user doesnt exist"})

        if(find.lendercash<lendercash) return res.json({msg:"Insufficient Funds to Withdraw"})
        const updated  = await lendermodel.updateOne({lenderid},{
            lendercash:find.lendercash-lendercash,lenderid
        })

        if(!updated) return res.json("could not deposit")

        return res.json({msg:"Withdrawn!"})
    }catch(e) {return res.json({msg:"Server Crashed"})}
} )



router.put("/depositVendor",fetchVendor,async(req,res)=>{
    
    try{
        
        const {vendorcash}= req.body
    
        vendorid = req.id
        const find = await vendormodel.findOne({vendorid})
        if(!find) return res.json({msg:"This user doesnt exist"})
        
        const updated  = await vendormodel.updateOne({vendorid},{
            vendorcash:find.vendorcash+vendorcash,vendorid
        })

        
        if(!updated) return res.json("could not deposit")

        return res.json({msg:"deposited!"})
    }catch(e) {return res.json({msg:"Server Crashed"})}
} )
router.put("/withdrawVendor",fetchVendor,async(req,res)=>{
    
    try{
        
        const {vendorcash}= req.body

        vendorid = req.id
        const find = await vendormodel.findOne({vendorid})
       
        if(!find) return res.json({msg:"This user doesnt exist"})

        if(find.vendorcash<vendorcash) return res.json({msg:"Insufficient Funds to Withdraw"})
        const updated  = await vendormodel.updateOne({vendorid},{
            vendorcash:find.vendorcash-vendorcash,vendorid
        })

        if(!updated) return res.json("could not deposit")

        return res.json({msg:"Withdrawn!"})
    }catch(e) {return res.json({msg:"Server Crashed"})}
} )


module.exports = router