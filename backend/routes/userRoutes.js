const router = require("express").Router()
const requireAuth = require("../middleware/requireAuth")
const { updateUser , deleteUser , getUser , followUser , unfollowUser } = require("../controllers/userController")


//run authm middleware
    router.use(requireAuth)


//UPDATE USER 
router.put("/:id", updateUser)

//DELETE USER 
router.delete("/:id", deleteUser)

//GET USER
router.get("/:id", getUser)

//FOLLOW USER
router.put("/follow/:id", followUser)

//UNFOLLOW USER
router.put("/unfollow/:id", unfollowUser)


module.exports = router