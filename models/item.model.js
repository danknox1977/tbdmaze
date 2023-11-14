const mongoose = require("mongoose");

const ItemSchema = new mongoose.Schema({
  itemName: {
    type: String,
    required: true,
    unique: true,
  },
  description: {
    type: String,
    required: true,
  },
  range: {
    type: Number,
    required: true,
    default: 0
  },
  pickup: {
    type: Boolean,
    required: true,
  },
  utility: {
    type: Boolean,
    required: true,
  },
  permanent: {
    type: Boolean,
    required: true,
  },
  location: {
    type: mongoose.Types.ObjectId,
    ref: "Room",
    required: true
  },
  effects: [{ type: mongoose.Types.ObjectId, ref: "Effects" }],
  
});

module.exports = mongoose.model("Item", ItemSchema);