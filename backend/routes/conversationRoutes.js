

const router = require("express").Router();
const  { addConversation, getConversation, getBetweenConversation } = require("../controllers/conversationController")

//add Conversation
router.post("/", addConversation );

//get Conversation
router.get("/:userId", getConversation );

// get Conversation between two users
router.get("/find/:firstUserId/:secondUserId", getBetweenConversation );

module.exports = router;