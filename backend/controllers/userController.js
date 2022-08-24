const User = require("../models/userModel")
const mongoose = require("mongoose")
const bcrypt = require("bcrypt")
const validator = require("validator")

//PUT - UPDATE USER 
const updateUser = async ( req , res ) => {
    const userid = req.user
    const userparam_id = req.params.id

 
    if( !mongoose.Types.ObjectId.isValid(userid._id)  || userid._id.toString() !== userparam_id)
        { return res.status(404).json({error: "User not found "}) }


    if(req.body.password) {

    if(!validator.isStrongPassword(req.body.password)) { 
        return res.status(404).json({error: "Please use a strong password. Password should include a capital letter , small letter , number and symbol"})
    }

        try {

            const salt = await bcrypt.genSalt(10)
            const hash = await bcrypt.hash(req.body.password , salt) 
            req.body.password = hash

        } catch(error) {
            {  res.status(404).json({error: "Change user info failed "}) }
        }
    }


       try {

       const user_json = await User.findOneAndUpdate({ _id : userid } , { ...req.body })
          res.status(200).json(user_json)

       } catch(error) {    res.status(404).json({error: "Change user info failed "}) }
}

//DELETE user
const deleteUser = async ( req , res ) => {
    const userid = req.user
    const userparam_id = req.params.id

  if(!userid || !userparam_id )
  
    { return res.status(404).json({error: "Bad request : id not provided"}) }

  if( !mongoose.Types.ObjectId.isValid(userid._id.toString()) ) 
    { return res.status(404).json({error: "User id is not valid "}) }

  if(!req.user_isAdmin.isAdmin && userid._id.toString() !== userparam_id ) {
             res.status(404).json({error: "Token and id mismatch"}) 
             return
    }

        const user = await User.deleteOne({ _id : userparam_id})

        if(!user) return res.status(404).json({error: "Delete user failed"})
    
        res.status(200).json(user)
    
}

//GET single user
const getUser = async ( req , res ) => {
    const {id} = req.params

       if( !mongoose.Types.ObjectId.isValid(id) ) 
            return res.status(404).json({error: "User id is not valid "})


    const user =  await User.findById(id)

        if(!user) return res.status(404).json({error: "User does not exist"})

        res.status(200).json(user)
}

//UPDATE - FOLLOW user
const followUser = async ( req , res ) => {

}


//UPDATE - UNFOLLOW user
const unfollowUser = async ( req , res ) => {
    
}


module.exports = {
    updateUser,
    deleteUser,
    getUser,
    followUser, 
    unfollowUser 
}