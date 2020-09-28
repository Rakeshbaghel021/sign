const express = require("express");
const User = require("../../controllers/userController");
const auth = require("../../middleware/auth");
const router = express.Router();

router.use(auth.verifyToken);

// get a current user

router.get("/", User.CurrentUser);

// update a user
router.put("/", User.UpdateUser);

// delete a user

router.delete("/", User.DeleteUser);

module.exports = router;
