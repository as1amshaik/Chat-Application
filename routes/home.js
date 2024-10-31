const express = require("express");
const { getFriends ,addFriend, sendMessage} = require("../controllers/home");

const router = express.Router();

router.get("/", getFriends);
router.post("/addFriend", addFriend);
router.post("/sendMessage", sendMessage);



module.exports = router;