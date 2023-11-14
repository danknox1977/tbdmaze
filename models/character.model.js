const mongoose = reqire("mongoose");

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
    
});

module.exports = mongoose.model("Character", CharacterSchema)