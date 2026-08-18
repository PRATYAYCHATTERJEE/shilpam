const express = require("express");

const {
    askSilpamAI
} = require("../services/geminiService");

const router = express.Router();


// ======================================
// TEST ROUTE
// ======================================

router.get("/test", (req, res) => {

    res.json({
        success: true,
        message: "Silpam AI route is working"
    });

});


// ======================================
// GEMINI CHAT ROUTE
// ======================================

router.post("/chat", async (req, res) => {

    try {

        const {
            message,
            course,
            step,
            language = "bn"
        } = req.body;


        // Validate message
        if (!message || !message.trim()) {

            return res.status(400).json({
                success: false,
                message: "Message is required"
            });

        }


        // Ask Gemini
        const reply = await askSilpamAI({
            message,
            course,
            step,
            language
        });


        // Send response
        return res.status(200).json({

            success: true,

            reply

        });

    }

    catch (error) {

        console.error(
            "Silpam AI Error:",
            error.message
        );


        return res.status(500).json({

            success: false,

            message:
                "Silpam AI could not process your request.",

            error:
                process.env.NODE_ENV === "development"
                    ? error.message
                    : undefined

        });

    }

});


module.exports = router;