const Post = require("../models/postModel")
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
    if( !mongoose.Types.ObjectId.isValid(req.params.id) )
    { return res.status(404).json({error: "Post id is not valid"}) }

    console.log(req.user_isAdmin.isAdmin , req.user_isAdmin.isAdmin.toString() === "false")
    try {
        const post = await Post.findById(req.params.id)

    
        if(post.userId !== req.user._id.toString()) 
        { res.status(403).json("You are not authorized to delete this post") }


            await post.deleteOne()
        res.status(200).json("Post deleted")

    } catch(error) {
        res.status(500).json(error)
    }
}


module.exports = { createPost , updatePost , deletePost }