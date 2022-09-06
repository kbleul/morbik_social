require("dotenv").config()
const express = require("express")
const mongoose = require("mongoose")
const helmet = require("helmet")

const userAuthRoutes = require("./routes/userAuthRoutes")
const userRoutes = require("./routes/userRoutes")
const postRoutes = require("./routes/postRoutes")

const User = require("./models/userModel")



const multer  = require('multer')
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'public/data/uploads/')
    },
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)

      const [ originalname , extension] = file.originalname.split(".")
      const fullImgName = originalname + "" + file.fieldname + '-' + uniqueSuffix +  "." + extension
      cb(null, fullImgName)

      req.img = fullImgName

    }
  })
  


const upload = multer({ storage: storage })

const app = express()
app.use(express.static('public')); 

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


   
       
    // })

    
    app.use("/api/auth", userAuthRoutes)
    app.use("/api/user/profile", upload.single('avatar'), userRoutes )
    app.use("/api/user", userRoutes)
    app.use("/api/post", postRoutes)




