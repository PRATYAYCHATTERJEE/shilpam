const bcrypt = require("bcryptjs");
const Seller = require("../models/Seller");

const registerSeller = async (req, res) => {
    try {
        const {
            email,
            password,
            fullName,
            businessName,
            phone,
            location,
            craftCategory,
            experience,
            craftStory
        } = req.body;

        // Check required fields
        if (
            !email ||
            !password ||
            !fullName ||
            !businessName ||
            !phone ||
            !location ||
            !craftCategory ||
            !experience ||
            !craftStory
        ) {
            return res.status(400).json({
                message: "Please provide all required seller information."
            });
        }

        // Validate password
        if (password.length < 6) {
            return res.status(400).json({
                message: "Password must contain at least 6 characters."
            });
        }

        // Check if seller already exists
        const existingSeller = await Seller.findOne({ email });

        if (existingSeller) {
            return res.status(409).json({
                message: "A seller account with this email already exists."
            });
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create seller
        const seller = await Seller.create({
            email,
            password: hashedPassword,
            fullName,
            businessName,
            phone,
            location,
            craftCategory,
            experience,
            craftStory,
            status: "pending"
        });

        // Send response
        res.status(201).json({
            message: "Partnership request submitted successfully.",
            seller: {
                id: seller._id,
                email: seller.email,
                fullName: seller.fullName,
                businessName: seller.businessName,
                phone: seller.phone,
                location: seller.location,
                craftCategory: seller.craftCategory,
                experience: seller.experience,
                craftStory: seller.craftStory,
                status: seller.status
            }
        });

    } catch (error) {
        console.error("Seller registration error:", error);

        res.status(500).json({
            message: "Server error while submitting partnership request."
        });
    }
};

module.exports = {
    registerSeller
};