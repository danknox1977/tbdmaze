//! DEPENDENCIES/IMPORTS
require("dotenv").config();
const express = require("express");
const cors = require("cors");
const { db } = require("./db");
const { UserController, CharacterController } = require('./controllers');
// const validateSession = require("./middleware/validate-session");
// const jwt = require("jsonwebtoken");

const app = express();
const PORT = process.env.PORT;


//! MIDDLEWARE
app.use(express.json());
app.use(cors())

const log = console.log;

//! ROUTES
app.use("/user", UserController)
app.use("/character", CharacterController)

//! CONNECTION

const server = async () => {
    db();
    app.listen(PORT, () => log(`tbdmaze Server Running on Port: ${PORT}`))
};

server()
