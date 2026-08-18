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

const jwt = require("jsonwebtoken");


// =========================================
// SELLER LOGIN
// =========================================

const loginSeller = async (req, res) => {

    try {

        const { email, password } = req.body;


        // Check required fields
        if (!email || !password) {

            return res.status(400).json({
                message: "Please provide email and password."
            });

        }


        // Find seller
        const seller = await Seller.findOne({
            email: email.toLowerCase().trim()
        });


        // Seller not found
        if (!seller) {

            return res.status(401).json({
                message: "Invalid email or password."
            });

        }


        // Check password
        const passwordMatch =
            await bcrypt.compare(
                password,
                seller.password
            );


        if (!passwordMatch) {

            return res.status(401).json({
                message: "Invalid email or password."
            });

        }


        // Check seller approval status
        if (seller.status !== "approved") {

            if (seller.status === "pending") {

                return res.status(403).json({
                    message:
                        "Your seller account is still pending approval."
                });

            }


            if (seller.status === "rejected") {

                return res.status(403).json({
                    message:
                        "Your seller application has been rejected."
                });

            }

        }


        // Generate JWT
        const token = jwt.sign(
            {
                sellerId: seller._id,
                email: seller.email,
                role: "seller"
            },
            process.env.JWT_SECRET,
            {
                expiresIn: "7d"
            }
        );


        // Send response
        res.status(200).json({

            message: "Seller login successful.",

            token,

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

        console.error(
            "Seller login error:",
            error
        );


        res.status(500).json({
            message: "Server error during seller login."
        });

    }

};

module.exports = {
    registerSeller,
    loginSeller
};