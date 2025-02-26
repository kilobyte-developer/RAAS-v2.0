const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
const PORT = 5000;

// Middleware
app.use(express.json());
app.use(cors());

// MongoDB Connection
mongoose.connect("mongodb+srv://atharvafunde26:atharvafunde26@raas.ufnqk.mongodb.net/Gallery?retryWrites=true&w=majority", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

mongoose.connection.once("open", () => {
    console.log("✅ MongoDB Connected Successfully");
}).on("error", (err) => {
    console.error("❌ MongoDB Connection Error:", err);
});

// Artwork Schema
const artworkSchema = new mongoose.Schema({
    name: String,
    productId: String,
    category: String,
    imageUrl: String,
});

const Artwork = mongoose.model("Artwork", artworkSchema);

// Route to fetch all artworks
app.get("/get-artworks", async (req, res) => {
    try {
        const artworks = await Artwork.find();
        console.log("🎨 Fetched Artworks:", artworks);
        res.json(artworks);
    } catch (error) {
        console.error("❌ Error fetching artworks:", error);
        res.status(500).json({ message: "Error fetching artworks", error });
    }
});

// Route to add a new artwork
app.post("/add-artwork", async (req, res) => {
    try {
        console.log("Received Data:", req.body); // Debugging log
        const { name, productId, category, imageUrl } = req.body;

        if (!name || !productId || !category || !imageUrl) {
            return res.status(400).json({ message: "⚠️ All fields are required!" });
        }

        const newArtwork = new Artwork({ name, productId, category, imageUrl });
        await newArtwork.save();
        console.log("✅ Artwork Added to DB:", newArtwork);
        res.status(201).json({ message: "Artwork added successfully", artwork: newArtwork });
    } catch (error) {
        console.error("❌ Error adding artwork:", error);
        res.status(500).json({ message: "Error adding artwork", error });
    }
});

// Route to update an artwork
app.put("/update-artwork/:id", async (req, res) => {
    try {
        const { name, productId, category, imageUrl } = req.body;

        if (!name || !productId || !category || !imageUrl) {
            return res.status(400).json({ message: "⚠️ All fields are required!" });
        }

        const updatedArtwork = await Artwork.findByIdAndUpdate(
            req.params.id,
            { name, productId, category, imageUrl },
            { new: true } // Return the updated artwork
        );

        if (!updatedArtwork) {
            return res.status(404).json({ message: "Artwork not found" });
        }

        console.log("✅ Artwork Updated:", updatedArtwork);
        res.json({ message: "Artwork updated successfully", artwork: updatedArtwork });
    } catch (error) {
        console.error("❌ Error updating artwork:", error);
        res.status(500).json({ message: "Error updating artwork", error });
    }
});

// Route to delete an artwork
app.delete("/delete-artwork/:id", async (req, res) => {
    try {
        const deletedArtwork = await Artwork.findByIdAndDelete(req.params.id);
        if (!deletedArtwork) {
            return res.status(404).json({ message: "Artwork not found" });
        }
        console.log("✅ Artwork Deleted:", deletedArtwork);
        res.json({ message: "Artwork deleted successfully", artwork: deletedArtwork });
    } catch (error) {
        console.error("❌ Error deleting artwork:", error);
        res.status(500).json({ message: "Error deleting artwork", error });
    }
});

// Start Server
app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
});
