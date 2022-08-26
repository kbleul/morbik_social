const Post = require("../models/postModel")
const User = require("../models/userModel")

const mongoose = require("mongoose")


const createPost = async(req ,res) => {
    const newPost = new Post(req.body)

    if( !mongoose.Types.ObjectId.isValid(newPost.userId) || newPost.userId !== req.user._id.toString() ) 
               { return res.status(404).json({error: "User id is not valid"}) }

    try {
        const savedPost = await newPost.save()
        res.status(200).json(savedPost)
    } catch(error) { req.status(500).json(error) }
    
}

const updatePost = async (req , res ) => {

    if( !mongoose.Types.ObjectId.isValid(req.params.id) )
         { return res.status(404).json({error: "Post id is not valid"}) }

         if(req.body.userId)
         { return res.status(404).json({error: "User id can not be changed "})}

    try {
        const post = await Post.findById(req.params.id)

        if(post.userId !== req.user._id.toString()) 
        { res.status(403).json("You are not authorized to update this post") }


            await post.updateOne({ $set : req.body })
                res.status(200).json("New post added")

    } catch(error) {
        res.status(500).json(error)
    }
}


const deletePost = async ( req , res ) => {

    const isadmin = req.user_isAdmin.isAdmin.toString()

    if( !mongoose.Types.ObjectId.isValid(req.params.id) )
    { return res.status(404).json({error: "Post id is not valid"}) }

    console.log(req.user_isAdmin.isAdmin , isadmin === "false")
    try {
        const post = await Post.findById(req.params.id)

    
        if(isadmin === "false" && post.userId !== req.user._id.toString()) 
        { res.status(403).json("You are not authorized to delete this post") }


            await post.deleteOne()

        isadmin === "true" ?  res.status(200).json("Post deleted by admin") :
                      res.status(200).json("Post deleted by you")

    } catch(error) {
        res.status(500).json(error)
    }
}

const likePost = async (req , res ) => {

    if( !mongoose.Types.ObjectId.isValid(req.params.id) )
    { return res.status(404).json({error: "Post id is not valid"}) }

    try {
    const post = await Post.findById(req.params.id)

        if(!post.likes.includes(req.user._id.toString())) {
            await Post.updateOne({ $push : { likes: req.user._id.toString() }  })
            res.status(200).json("Liked post")
        }
        else { 
            await Post.updateOne({ $pull : { likes: req.user._id.toString() }  })
            res.status(200).json("Disliked post")
        }

    } catch(error) {
            res.status(500).json(error)
    }

}

const getPost = async (req , res ) => {

    if( !mongoose.Types.ObjectId.isValid(req.params.id) )
    { return res.status(404).json({error: "Post id is not valid"}) }

    try {
        const post = await Post.findById(req.params.id)
            res.status(200).json(post)

    } catch(error) {
        res.status(500).json(error)
    }
}

const getTimelinePost = async (req , res ) => {
    console.log("dfgfd", req.user._id.toString())
    let currentuser
    try {
         currentuser = await User.findById(req.user._id.toString()); console.log(currentuser.username)
        const userposts = await Post.find( { userId : currentuser._id }); console.log(userposts , currentuser.following)
        const friendsposts = await Promise.all(
            currentuser.following.map( friend => {
             return Post.find({ userId : friend })
            })
        ) 

        res.status(200).json([ ...userposts , ...friendsposts ])

    } catch(error) {
        res.status(500).json(currentuser)
    }
}

module.exports = { createPost, updatePost, deletePost, likePost, getPost, getTimelinePost }