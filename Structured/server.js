const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(express.json());
app.use(cors({ origin: "*" })); // Allow all origins (for local testing)
app.use(express.static(path.join(__dirname, "public"))); // Serve static files

// MongoDB Connection
mongoose
  .connect(
    "mongodb+srv://atharvafunde26:atharvafunde26@raas.ufnqk.mongodb.net/Gallery?retryWrites=true&w=majority",
    { useNewUrlParser: true, useUnifiedTopology: true }
  )
  .then(() => console.log("✅ MongoDB Connected Successfully"))
  .catch((error) => console.error("❌ MongoDB Connection Error:", error));

// Artwork Schema & Model
const artworkSchema = new mongoose.Schema({
  name: { type: String, required: true },
  productId: { type: String, required: true },
  category: { type: String, required: true },
  imageUrl: { type: String, required: true },
});

const Artwork = mongoose.model("Artwork", artworkSchema);

// Routes

// Fetch all artworks
app.get("/get-artworks", async (req, res) => {
  try {
    const artworks = await Artwork.find();
    console.log("🎨 Artworks Fetched:", artworks.length);
    res.json(artworks);
  } catch (error) {
    console.error("❌ Error fetching artworks:", error);
    res.status(500).json({ message: "Internal Server Error", error });
  }
});

// Add a new artwork
app.post("/add-artwork", async (req, res) => {
  try {
    const { name, productId, category, imageUrl } = req.body;

    if (!name || !productId || !category || !imageUrl) {
      return res.status(400).json({ message: "⚠️ All fields are required!" });
    }

    const newArtwork = new Artwork({ name, productId, category, imageUrl });
    await newArtwork.save();

    console.log("✅ Artwork Added:", newArtwork);
    res.status(201).json({ message: "Artwork added successfully", artwork: newArtwork });
  } catch (error) {
    console.error("❌ Error adding artwork:", error);
    res.status(500).json({ message: "Internal Server Error", error });
  }
});

// Update an artwork
app.put("/update-artwork/:id", async (req, res) => {
  try {
    const { name, productId, category, imageUrl } = req.body;

    if (!name || !productId || !category || !imageUrl) {
      return res.status(400).json({ message: "⚠️ All fields are required!" });
    }

    const updatedArtwork = await Artwork.findByIdAndUpdate(
      req.params.id,
      { name, productId, category, imageUrl },
      { new: true }
    );

    if (!updatedArtwork) {
      return res.status(404).json({ message: "⚠️ Artwork not found" });
    }

    console.log("✅ Artwork Updated:", updatedArtwork);
    res.json({ message: "Artwork updated successfully", artwork: updatedArtwork });
  } catch (error) {
    console.error("❌ Error updating artwork:", error);
    res.status(500).json({ message: "Internal Server Error", error });
  }
});

// Delete an artwork
app.delete("/delete-artwork/:id", async (req, res) => {
  try {
    const deletedArtwork = await Artwork.findByIdAndDelete(req.params.id);
    if (!deletedArtwork) {
      return res.status(404).json({ message: "⚠️ Artwork not found" });
    }

    console.log("✅ Artwork Deleted:", deletedArtwork);
    res.json({ message: "Artwork deleted successfully", artwork: deletedArtwork });
  } catch (error) {
    console.error("❌ Error deleting artwork:", error);
    res.status(500).json({ message: "Internal Server Error", error });
  }
});

// Start Server
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
// if not displayued server then display the error
