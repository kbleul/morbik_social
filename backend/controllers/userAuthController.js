const User = require("../models/userModel")
const jwt = require("jsonwebtoken")

const createToken = (_id) => 
            { return jwt.sign({ _id } , process.env.SECRET, { expiresIn : "3d" })  }

 const signupUser = async(req , res) => { 
    const { username ,email , password } = req.body

    try {
        const user = await User.signup( username , email , password )

        console.log(user)
                //create token
                const token = createToken(user._id)

        res.status(200).json({username , token })

    } catch(error) {
        res.status(400).json({error : error.message})
    }
}

const loginUser = async ( req , res ) => {
    const { username  ,  password } = req.body

    console.log("username ::: " , username)
    console.log("password ::: " , password)


    try {
        const user = await User.login( username , password )

                //create token
                const token = createToken(user._id)

        res.status(200).json({_id : user._id , username , token })

    } catch(error) {
        res.status(400).json({error : error.message})

    }

}

module.exports = { signupUser , loginUser }