const User = require("../models/userModel")
const mongoose = require("mongoose")
const bcrypt = require("bcrypt")
const validator = require("validator")

const prepareReturnObj =  (user ) => {
    const returnObj = { username : user.username , email : user.email , disc : user.disc , city : user.city , country : user.country , relationship : user.relationship , follower : user.followers , following : user.following }

    return returnObj
}


//PUT - UPDATE USER 
const updateUser = async ( req , res ) => {
    const userid = req.user
    const userparam_id = req.params.id
 
   console.log("asjdasdsak" , req.body)
    if( !mongoose.Types.ObjectId.isValid(userid._id)  || userid._id.toString() !== userparam_id)
        { return res.status(404).json({error: "User id not valid "}) }


    if(req.body.password) {

    if(!validator.isStrongPassword(req.body.password)) { 
        return res.status(404).json({error:`Please use a strong password.
         Password should include a capital letter , small letter , number and symbol`})
    }

        try {

            const salt = await bcrypt.genSalt(10)
            const hash = await bcrypt.hash(req.body.password , salt) 
            req.body.password = hash

        } catch(error) {
              res.status(404).json({error: "Change user password failed "}) 
        }
    }


       try {
console.log("body " , req.body)
       const user_json = await User.findOneAndUpdate({ _id : userparam_id } , { ...req.body })

       const updated_user = await User.findById({ _id : userparam_id })
console.log(updated_user)
    
          res.status(200).json(prepareReturnObj(updated_user) )

       } catch(error) {    res.status(404).json({error: error}) }
}

//PUT UPDATE PROFILE Picture
const updateProfilePic = async ( req, res ) => {
    console.log(req.img , "olalallaal")
      const userparam_id = req.params.id

      try {
          const user_json = await User.findOneAndUpdate({ _id : userparam_id } , { ...{"profilePicture" : req.img} })
  console.log(user_json)

          res.status(200).json({ profilePicture : req.img })
          }  catch(error) {    
              res.status(404).json({error: "Profile picture not uploaded "}) 
          }
}

const updateCoverPic = async ( req , res ) => {
    console.log(req.img, "loaaa")
      const userparam_id = req.params.id

      try {
          const user_json = await User.findOneAndUpdate({ _id : userparam_id } , { ...{"coverPicture" : req.img} })
             console.log(user_json)
       
             res.status(200).json({ coverPicture : req.img })
          }  catch(error) {    
              res.status(404).json({error: "Profile picture not uploaded "}) 
          }
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
     //create a safe json file that does not include password or other fields
     const {password , createdAt , updatedAt , ...safe_json} = user._doc


        if(!user) return res.status(404).json({error: "User does not exist"})

        res.status(200).json(safe_json)
}

//UPDATE - FOLLOW user
const followUser = async ( req , res ) => {
    const currentuser = req.user._id.toString()
    const userparam_id = req.params.id

        if(currentuser !== userparam_id) {

            try {

                const user = await User.findById(userparam_id)
                const currentuser_obj = await User.findById(currentuser)

                if(!user.followers.includes(currentuser)) 
                {
                    await user.updateOne({ $push : { followers : currentuser }})
                    await currentuser_obj.updateOne({ $push : { following : user._id }})

                    res.status(200).json("Followed user")
                    return
                }

                res.status(401).json({error : "You aleady follow user"})

            } catch(error) { res.status(500).json(error) }
        }

        else {  res.status(403).json("You can not follow yourself")  }

}


//UPDATE - UNFOLLOW user
const unfollowUser = async ( req , res ) => {
    const currentuser = req.user._id.toString()
    const userparam_id = req.params.id

        if(currentuser !== userparam_id) {

            try {

                const user = await User.findById(userparam_id)
                const currentuser_obj = await User.findById(currentuser)

                if(user.followers.includes(currentuser)) 
                {
                    await user.updateOne({ $pull : { followers : currentuser }})
                    await currentuser_obj.updateOne({ $pull : { following : user._id }})

                    res.status(200).json("Unfollowed user")
                    return
                }

                res.status(401).json({error : "You don't follow user"})

            } catch(error) { res.status(500).json(error) }
        }

        else {  res.status(403).json("Action on yourself")  }
}


module.exports = {
    updateUser, updateProfilePic , updateCoverPic ,deleteUser, getUser, followUser, unfollowUser 
}