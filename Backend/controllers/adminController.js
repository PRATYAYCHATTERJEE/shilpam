const Seller = require("../models/Seller");


// =========================================
// GET ALL SELLERS
// =========================================

const getAllSellers = async (req, res) => {

    try {

        const sellers =
            await Seller.find()
                .select("-password")
                .sort({ createdAt: -1 });


        res.status(200).json({

            count: sellers.length,

            sellers

        });


    } catch (error) {

        console.error(
            "Get sellers error:",
            error
        );


        res.status(500).json({
            message: "Failed to fetch sellers."
        });

    }

};


// =========================================
// UPDATE SELLER STATUS
// =========================================

const updateSellerStatus = async (req, res) => {

    try {

        const { id } = req.params;

        const { status } = req.body;


        // Validate status
        if (
            !["pending", "approved", "rejected"]
                .includes(status)
        ) {

            return res.status(400).json({
                message: "Invalid seller status."
            });

        }


        const seller =
            await Seller.findByIdAndUpdate(
                id,
                { status },
                {
                    new: true,
                    runValidators: true
                }
            )
            .select("-password");


        if (!seller) {

            return res.status(404).json({
                message: "Seller not found."
            });

        }


        res.status(200).json({

            message:
                `Seller ${status} successfully.`,

            seller

        });


    } catch (error) {

        console.error(
            "Update seller status error:",
            error
        );


        res.status(500).json({
            message:
                "Failed to update seller status."
        });

    }

};


module.exports = {
    getAllSellers,
    updateSellerStatus
};