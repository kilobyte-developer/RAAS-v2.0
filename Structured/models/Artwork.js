const mongoose = require("mongoose");

const ArtworkSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    productId: {
        type: String,
        required: true,
        unique: true,
    },
    category: {
        type: String,
        required: true,
    },
    imageUrl: {
        type: String,
        required: true,
    },
}, { timestamps: true });

const Artwork = mongoose.model("Artwork", ArtworkSchema);

module.exports = Artwork;
