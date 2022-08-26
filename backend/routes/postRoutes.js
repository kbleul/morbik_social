const router = require("express").Router()
const requireAuth = require("../middleware/requireAuth")
const { createPost , updatePost , deletePost  } = require("../controllers/postController")


// run authm middleware
router.use(requireAuth)

//CREATE POST
router.post("/", createPost )

//UPDATE POST
router.put("/:id", updatePost )

//DELETE POST
router.delete("/:id", deletePost )


//LIKE POST

//GET A POST

//GET TIMELINE POSTS

module.exports = router
