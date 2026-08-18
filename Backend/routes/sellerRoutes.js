const express = require("express");

const {
    registerSeller
} = require("../controllers/sellerController");

const router = express.Router();

// Seller registration / partnership request
router.post("/register", registerSeller);

module.exports = router;