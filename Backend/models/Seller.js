const mongoose = require("mongoose");

const sellerSchema = new mongoose.Schema(
    {
        email: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true
        },

        password: {
            type: String,
            required: true
        },

        fullName: {
            type: String,
            required: true,
            trim: true
        },

        businessName: {
            type: String,
            required: true,
            trim: true
        },

        phone: {
            type: String,
            required: true,
            trim: true
        },

        location: {
            type: String,
            required: true,
            trim: true
        },

        craftCategory: {
            type: String,
            required: true,
            trim: true
        },

        experience: {
            type: String,
            required: true,
            trim: true
        },

        craftStory: {
            type: String,
            required: true,
            trim: true
        },

        productImages: {
            type: [String],
            default: []
        },

        status: {
            type: String,
            enum: ["pending", "approved", "rejected"],
            default: "pending"
        }
    },
    {
        timestamps: true
    }
);

const Seller = mongoose.model("Seller", sellerSchema);

module.exports = Seller;