const jwt = require("jsonwebtoken")
const User = require("../models/userModel")

const requireAuth = async ( req , res , next ) => {

    const { authorization } = req.headers

    if(!authorization) return res.status(401).json({ error : "Authorization required"})

    const token = authorization.split(" ")[1]

    console.log("authorization", token)

    try {
        const { _id } = jwt.verify(token , process.env.SECRET)

        req.user = await User.findOne({ _id }).select("_id")
        req.user_isAdmin = await User.findOne({ _id }).select("isAdmin")

        // if(!req.user_isAdmin) 
        //      req.user_isAdmin =  false
        // else
        //      req.user_isAdmin =  true

        if(!req.user) {
        res.status(401).json({ error : "Request is not authorized"})
        return
        }
        next()
    } catch (error) {
        console.log(error)
        res.status(401).json({ error : "Request is not authorized"})
    }

}

module.exports = requireAuth