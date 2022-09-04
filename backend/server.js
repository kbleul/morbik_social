require("dotenv").config()
const express = require("express")
const mongoose = require("mongoose")
const helmet = require("helmet")

const userAuthRoutes = require("./routes/userAuthRoutes")
const userRoutes = require("./routes/userRoutes")
const postRoutes = require("./routes/postRoutes")




const app = express()

    //middlewares
    app.use(express.json())
   // app.use(helmet())


    app.use((req , res , next) => { 
        console.log(req.path, req.method , req.body)
        
        next()
    })


    mongoose.connect(process.env.MONGO_URI)
                .then(() => {
                    app.listen(process.env.PORT , () => { console.log("Server is running at " + process.env.PORT )})
                })
                    .catch(error => console.log(error))


    app.use("/api/auth", userAuthRoutes)
    app.use("/api/user", userRoutes)
    app.use("/api/post", postRoutes)

