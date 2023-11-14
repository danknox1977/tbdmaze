const mongoose = require("mongoose");

const CharacterSchema = new mongoose.Schema({
    characterName: {
        type: String,
        required: true, 
    },
    user: {
       type: mongoose.Types.ObjectId,
       ref: "User",
       required: true, 
    },
    inventory: [{ type: mongoose.Types.ObjectId, ref: "Item" }],
    abilities: [{ type: mongoose.Types.ObjectId, ref: "Ability" }],
    icon: {
        type: String,
    },
    backstory: {
        type: String
    },
    level: {
        type: Number,
        default: 0,
    },
    experience: {
        type: Number,
        default: 0,
    },
    offense: {
        type: Number,
        default: 0,
    },
    defense: {
        type: Number,
        default: 0,
    },
    health: {
        type: Number,
        default: 0,
    },
});

module.exports = mongoose.model("Character", CharacterSchema)