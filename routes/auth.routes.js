const express = require("express");
const { signUp, login } = require("../controllers/auth.controller");

const router = express.Router();

// localhost:3000/users
router.route("/users/register").post(signUp);
router.route("/users/login").post(login);

module.exports = { router, authRouter: router };
