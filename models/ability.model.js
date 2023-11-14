const mongoose = require("mongoose");

const AbilitySchema = new mongoose.Schema({
  abilityName: {
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
  owner: {
    type: mongoose.Types.ObjectId,
    ref: "Character",
    required: true,
  },
  charges: {
    type: Number,
    default: 1,
  },
  effects: [{ type: mongoose.Types.ObjectId, ref: "Effects" }],
//! Duration - Stretch
  
});

module.exports = mongoose.model("Ability", AbilitySchema);