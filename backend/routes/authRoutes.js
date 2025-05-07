const router = require("express").Router();
const { signupUser, loginUser, logoutUser, updateProfile, checkAuthUser } = require("../controllers/authControllers");
const protectRoute = require("../middlewares/authMiddlewares");

router.post("/signup", signupUser );
router.post("/login", loginUser );
router.post("/logout", logoutUser );

router.put("/profile", protectRoute, updateProfile);

router.get("/check", protectRoute, checkAuthUser);

module.exports = router;