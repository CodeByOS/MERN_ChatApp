const { getUsersForSidebar, getMessages, sendMessages } = require("../controllers/messageControllers");
const protectRoute = require("../middlewares/authMiddlewares");

const router = require("express").Router();


router.get("/users", protectRoute, getUsersForSidebar);
router.get("/:id", protectRoute, getMessages);

router.post("/send/:id", protectRoute, sendMessages);


module.exports = router;