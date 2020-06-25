const express = require("express");
const User = require("../../contollers/users");
const auth = require("../../middleware/auth");
const router = express.Router();

// sign up

router.post("/signup",User.Signup)

// sign in 

router.post("/signin", User.Signin)

// list of all users

router.get("/",User.ListUsers)

module.exports = router;