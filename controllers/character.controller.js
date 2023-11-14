const router = require("express").Router();
const { Character, User } = require("../models");
const { error, success, incomplete } = require("../utils");
const validateSession = require("../middleware/validate-session");

//! Get All -- GET
router.get("/", async (req, res) => {
    try {
      const getAllCharacters = await Character.find();
  
      getAllCharacters ? success(res, getAllCharacters) : incomplete(res);
    } catch (err) {
      error(res, err);
    }
  });


//! Get One -- GET
router.get("/:characterID/", async (req, res) => {
    try {
      const characterID = req.params.characterID;
      const getCharacter = await Character.find({ _id: characterID });
  
      getCharacter ? success(res, getCharacter) : incomplete(res);
    } catch (err) {
      error(res, err);
    }
  });

  //! Get All Users Characters -- GET
router.get("/:userID/", validateSession, async (req, res) => {
    try {
      const userID = req.params.userID;
      const getAllCharacters = await Character.find({ user: userID });
  
      getAllCharacters ? success(res, getAllCharacters) : incomplete(res);
    } catch (err) {
      error(res, err);
    }
  });


//! Create New -- POST 
router.post("/create", validateSession, async (req,res) => {
    try {
        const characterName = req.body.characterName;
        const user = req.user._id;
        const inventory = req.body.inventory;
        const abilities = req.body.abilities;
        const icon = req.body.icon;
        const backstory = req.body.backstory;
        const level = req.body.level;
        const experience = req.body.experience;
        const offense = req.body.offense;
        const defense = req.body.defense;
        const health = req.body.health;

        const character = new Character({
            characterName: characterName,
            user: user,
            inventory: inventory,
            abilities: abilities,
            icon: icon,
            backstory: backstory,
            level: level,
            experience: experience,
            offense: offense,
            defense: defense,
            health: health,
        });


    } catch (err) {
        error(res, err);
    }
})


//! Edit -- PATCH


//! Delete -- DELETE


module.exports = router;