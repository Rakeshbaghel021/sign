const express = require("express");
const router = express.Router();
const auth = require("../../middleware/auth");
const User = require("../../controllers/profileController");

// get user profile only for logged user
router.use(auth.verifyToken);

router.get("/:username", User.GetProfile);

// follow user

router.post("/:username/follow", User.FollowUser);

module.exports = router;
