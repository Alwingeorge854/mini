const express = require("express")
const router = express.Router()
const lenderModel = require("../model/Lender")
const vendorModel = require("../model/Vendor")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const fetchLender = require("../middleware/fetchLender")
const fetchVendor = require("../middleware/fetchVendor")


//lender signup
router.post("/lenderSignUp", async (req, res) => {

    try {
        const { username, password } = req.body

        const exists = await lenderModel.findOne({ username })
        if (exists) return res.json({ msg: "user already exists" })

        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, salt)



        const lenderCreated = await lenderModel.create({
            username, password: hashedPassword
        })

        if (!lenderCreated) return res.json({ msg: 'User Not Created' })

        return res.json({ msg: "User Created Successfully!" })

    } catch (e) { res.status(500).json({ msg: "Server crashed" }) }
})



//lender login
router.post("/lenderLogin", async (req, res) => {

    try {
        const { username, password } = req.body

        const user = await lenderModel.findOne({ username })


        if (!user) return res.json({ msg: "Invalid Credentials" })

        const passwordMatch = await bcrypt.compare(password, user.password)

        if (!passwordMatch) return res.json({ msg: "Invalid Credentials" })

        const data = {
            id: user._id
        }

        const token = jwt.sign(data, "shhh")

        res.json({ token })
    } catch (e) { res.status(500).json({ msg: "Server crashed" }) }
})


//kyc lender
router.put('/kycLender', fetchLender, async (req, res) => {
    try {

        const { firstname, lastname, phonenumber, aadharnumber, pancardnumber, address } = req.body
        const updateUser = await lenderModel.findByIdAndUpdate(req.id, {
            firstname,
            lastname,
            phonenumber,
            aadharnumber,
            pancardnumber,
            address
        })

        if (!updateUser) return res.json({ msg: "user not updated" })

        res.json({ msg: "updated" })
    } catch (e) { res.status(500).json({ msg: "Server crashed" }) }
})


//vendor signup
router.post("/vendorSignUp", async (req, res) => {

    try {
        const { username, password } = req.body


        const exists = await lenderModel.findOne({ username })
        if (exists) return res.json({ msg: "user already exists" })


        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, salt)


        const vendorCreated = await vendorModel.create({
            username, password: hashedPassword
        })


        if (!vendorCreated) return res.json({ msg: 'User Not Created' })

        return res.json({ msg: "User Created Successfully!" })

    } catch (e) { res.status(500).json({ msg: "Server crashed" }) }
})


//vendor login
router.post("/vendorLogin", async (req, res) => {

    try {
        const { username, password } = req.body

        const user = await vendorModel.findOne({ username })


        if (!user) return res.json({ msg: "Invalid username" })

        const passwordMatch = await bcrypt.compare(password, user.password)

        if (!passwordMatch) return res.json({ msg: "Invalid password" })

        const data = {
            id: user._id
        }

        const token = jwt.sign(data, "shhh")

        res.json({ token })
    } catch (e) { res.status(500).json({ msg: "Server crashed" }) }
})

//kyc vendor
router.put('/kycVendor', fetchVendor, async (req, res) => {
    try {

        const { firstname, lastname, phonenumber, aadharnumber, pancardnumber, address } = req.body
        const updateUser = await vendorModel.findByIdAndUpdate(req.id, {
            firstname,
            lastname,
            phonenumber,
            aadharnumber,
            pancardnumber,
            address
        })

        if (!updateUser) return res.json({ msg: "user not updated" })

        res.json({ msg: "updated!" })
    } catch (e) { res.status(500).json({ msg: "Server crashed" }) }
})


router.get("/fetchVendor", fetchVendor, async (req, res) => {
    const user = await vendorModel.findById(req.id)

    if (!user) return res.json({ msg: "illegal action" })

    return res.json(user)

})

router.get("/fetchLender", fetchLender, async (req, res) => {
    const user = await lenderModel.findById(req.id)

    if (!user) return res.json({ msg: "illegal action" })

    return res.json(user)
})

module.exports = router