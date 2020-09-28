const express = require("express");
const User = require("../../controllers/userController");
// const auth = require("../../middleware/auth");

const router = express.Router();

// sign up

router.post("/signup", User.Signup);

// sign in

router.post("/signin", User.Signin);

// list of all users

router.get("/", User.AllUsers);

// get a single user

router.get("/:id", User.SingleUser);

module.exports = router;
