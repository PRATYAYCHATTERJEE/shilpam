const express = require("express");

const adminProtect =
    require("../middleware/adminMiddleware");

const {
    getAllSellers,
    updateSellerStatus
} = require("../controllers/adminController");


const router = express.Router();


// Get all sellers
router.get(
    "/sellers",
    adminProtect,
    getAllSellers
);


// Approve / reject seller
router.patch(
    "/sellers/:id/status",
    adminProtect,
    updateSellerStatus
);


module.exports = router;