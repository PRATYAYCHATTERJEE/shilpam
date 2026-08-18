const express = require("express");

const {
    registerSeller,
    loginSeller
} = require("../controllers/sellerController");


const router = express.Router();


// Seller registration
router.post(
    "/register",
    registerSeller
);


// Seller login
router.post(
    "/login",
    loginSeller
);


module.exports = router;