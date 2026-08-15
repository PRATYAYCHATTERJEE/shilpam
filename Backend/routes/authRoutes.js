const express = require("express");
const protect = require("../middleware/authMiddleware");

const {
    registerUser,
    loginUser
} = require("../controllers/authController");

const router = express.Router();

// Register
router.post("/register", registerUser);

// Login
router.post("/login", loginUser);

// Protected route to get user info
router.get("/me", protect, (req, res) => {
    res.status(200).json({
        message: "You are authenticated!",
        user: req.user
    });
});

module.exports = router;