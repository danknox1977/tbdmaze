//! DEPENDENCIES/IMPORTS
require("dotenv").config();
const express = require("express");
const cors = require("cors");
const { db } = require("./db");
const { UserController } = require('./controllers');
const validateSession = require("./middleware/validate-session");
const jwt = require("jsonwebtoken");

const app = express();
const PORT = process.env.PORT;


//! MIDDLEWARE
app.use(express.json());
app.use(cors())

const log = console.log;

//! ROUTES
app.use("/user", UserController)

//! CONNECTION

const server = async () => {
    db();
    app.listen(PORT, () => log(`tbdmaze Server Running on Port: ${PORT}`))
};

server()
