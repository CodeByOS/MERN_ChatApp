const jwt = require("jsonwebtoken");
const User = require("../models/User");

//* Middleware to protect routes
const protectRoute = async (req, res, next) => {
    try {
        // Get token from cookies
        const token = req.cookies.jwt;

        // If no token, return unauthorized
        if (!token) return res.status(401).json({ message: "Unauthorized - No Token Provided..!" });

        // Verify the token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        if (!decoded) return res.status(401).json({ message: "Unauthorized - Invalid Token..!" });

        // Find user by ID from decoded token, exclude password field
        const user = await User.findById(decoded.userId).select("-password");

        // If user not found, return error
        if (!user) return res.status(404).json({ message: "User Not Found..!" });

        // Attach user object to request
        req.user = user;

        // Move to next middleware or route handler
        next();

    } catch (err) {
        console.log("Error in protectRoute Middleware..!", err.message);
        res.status(500).json({ message: "Internal Server Error..!" });
    }
}

module.exports = protectRoute;