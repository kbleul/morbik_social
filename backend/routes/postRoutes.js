const router = require("express").Router()
const requireAuth = require("../middleware/requireAuth")
const { createPost , updatePost , deletePost, likePost, getPost, getTimelinePost } = require("../controllers/postController")


// run authm middleware
router.use(requireAuth)

//CREATE POST
router.post("/", createPost )


//UPDATE POST
router.put("/:id", updatePost )

//DELETE POST
router.delete("/:id", deletePost )


//LIKE POST
router.put("/like/:id", likePost )

//GET TIMELINE POSTS
router.get("/timeline/all", getTimelinePost)

//GET A POST
router.get("/:id", getPost)




module.exports = router
