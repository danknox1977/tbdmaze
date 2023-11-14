const router = require("express").Router();
const { User } = require("../models");
const bcrypt = require("bcrypt");
const { error, success, incomplete } = require("../utils");
const validateSession = require("../middleware/validate-session");
const jwt = require("jsonwebtoken");
const SECRET = process.env.JWT;

// !! Signup -- POST
router.post("/signup", async (req, res) => {
  try {
    const user = new User({
      username: req.body.username,
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      password: bcrypt.hashSync(req.body.password, 13),
      socials: req.body.socials,
    });
    const newUser = await user.save();
    const token = jwt.sign({ id: newUser._id }, SECRET, {
      expiresIn: "1 day",
    });
    res.status(200).json({
      user: newUser,
      message: "Success!",
      token,
    });
  } catch (err) {
    res.status(500).json({
      error: err.message,
    });
  }
});

// !! Login -- POST
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email: email });
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!user || !passwordMatch)
      throw new Error("That combination of Email and Password does not match");
    const token = jwt.sign({ id: user._id }, SECRET, {
      expiresIn: "1 day",
    });
    let userID = user._id;
    res.status(200).json({
      message: `Success!`,
      user,
      userID,
      token,
    });
  } catch (err) {
    res.status(500).json({
      error: err.message,
    });
  }
});

// !! Update By ID -- PATCH
router.patch("/edit/:userID", validateSession, async (req, res) => {
  try {
    const userID = req.params.userID;
    const newUsername = req.body.username;
    const newFirstName = req.body.firstName;
    const newLastName = req.body.lastName;
    const newEmail = req.body.email;
    

    const updatedInfo = {
      username: newUsername,
      firstName: newFirstName,
      lastName: newLastName,
      email: newEmail,
     
    };
    const updatedUser = await User.findOneAndUpdate(
      { _id: userID },
      updatedInfo,
      { new: true }
    );
    if (!updatedUser) {
      return res.status(404).json({ message: "User Not Found" });
    }
    res
      .status(200)
      .json({ message: "User has been updated", updatedUser });
  } catch (err) {
    error(res, err);
  }
});

// !! Get One by ID -- GET
router.get("/:userID/", async (req, res) => {
  try {
    const userID = req.params.userID;
    const getUser = await User.find({ _id: userID });

    getUser ? success(res, getUser) : incomplete(res);
  } catch (err) {
    error(res, err);
  }
});

// !! Get All -- GET
router.get("/", async (req, res) => {
  try {
    const getAllUsers = await User.find();

    getAllUsers ? success(res, getAllUsers) : incomplete(res);
  } catch (err) {
    error(res, err);
  }
});

// !! Delete -- DELETE
router.delete("/delete/:userID", validateSession, async (req, res) => {
  try {
    const userID = req.params.userID;

    const deleteUser = await User.deleteOne({
      _id: userID,
    });

    if (!deleteUser) {
      return res.status(404).json({ message: "User Not Found" });
    }
    res.status(200).json({ message: "User has been deleted" });
  } catch (err) {
    error(res, err);
  }
});

module.exports = router;
