const jwt = require("jsonwebtoken")

const fetchLender = (req, res, next) => {
    try {
        const token = req.header("auth-token")
        
        if (!token) return res.status(401).json({ msg: "unauthorized access" })  
        
        const data = jwt.verify(token,"shhh")
     
        req.id = data.id
        next()
    } catch (e) { res.status(500).json({ msg: "Server crashed" }) }
}

module.exports = fetchLender