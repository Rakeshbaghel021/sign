const User = require("../models/User");
const jwt = require("jsonwebtoken");

module.exports = {
  // sign up user

  Signup: async (req, res) => {
    try {
      let user = await User.create(req.body);
      // console.log(req.body);
      if (!user) {
        return res.json({ success: false, msg: "user not found" });
      }
      return res.json({ user, success: true });
    } catch (error) {
      return res.json({ error });
    }
  },

  // sign in user

  Signin: async (req, res) => {
    let { email, password } = req.body;
    try {
      let user = await User.findOne({ email });
      if (!user) return res.json({ success: false, msg: "Invalid email" });

      if (await user.verifyPassword(password)) {
        //jwt

        jwt.sign(
          {
            userId: user._id,
            username: user.username,
            email: user.email,
          },
          process.env.SECRET,
          (err, token) => {
            if (err) return next(err);
            res.json({
              success: true,
              message: "you are logged in",
              token,
            });
          }
        );
      } else {
        res.json({ msg: "Invallid Password!" });
      }
    } catch (err) {
      return res.json(err);
    }
  },
  // get list of all users
  AllUsers: async (req, res, next) => {
    try {
      let users = await User.find({}, "-password");
      // console.log(users)
      if (!users) return res.json({ success: false, msg: "no users found!" });
      res.json({ success: true, users });
    } catch (err) {
      return res.json(err);
    }
  },
  // get a single user
  SingleUser: async (req, res) => {
    const id = req.params.id;
    try {
      let user = await User.findById(id, "-password");
      if (!user) res.json({ success: false, msg: "user not found" });
      res.json({ user, success: true });
    } catch (error) {
      return res.json(error);
    }
  },

  //  get a current user
  CurrentUser: async (req, res) => {
    const id = req.userId;
    console.log(id, "in");
    try {
      let user = await User.findById(id, "-password");
      console.log(user, "hi");
      if (!user) return res.json({ success: false, msg: "user not found" });
      res.json({ user, success: true });
    } catch (error) {
      return res.json(error);
    }
  },
  // update a user
  UpdateUser: async (req, res) => {
    const id = req.params.id;
    console.log(id, "hey");
    try {
      let user = await User.findByIdAndUpdate(id, req.body, { new: true });
      if (!user) return res.json({ success: false, msg: "user not found" });
      res.json({ user, success: true });
    } catch (error) {
      return res.json(error);
    }
  },
  // delete a user

  DeleteUser: async (req, res) => {
    const id = req.params.id;
    try {
      let user = await User.findByIdAndDelete(id);
      if (!user) return res.json({ success: false, msg: "user not found" });
      res.json({ user, success: true, msg: "user deleted succesfully" });
    } catch (error) {
      return res.json(error);
    }
  },
};
