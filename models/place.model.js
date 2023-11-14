const mongoose = require("mongoose");

const PlaceSchema = new mongoose.Schema({
  placeName: {
    type: String,
    required: true,
    unique: true,
  },
  description: {
    type: String,
    required: true,
  },
  inspection: {
    type: String,
    required: true,
  },
  connections: [{ type: mongoose.Types.ObjectId, ref: "Place" }],
  contents: [{ type: mongoose.Types.ObjectId, ref: "Item" }],
  
});

module.exports = mongoose.model("Place", PlaceSchema);