const User = require("../models/User");

module.exports = {
  // get profile of a user

  GetProfile: async (req, res) => {
    let username = req.params.username;
    // console.log(username);
    try {
      let user = await User.findOne({ username }, "-password");
      if (!user) res.json({ success: false, msg: "user not found" });
      res.json({ user, success: true });
    } catch (error) {
      res.json(error);
    }
  },

  FollowUser: async (req, res) => {
    username = req.params.username;
    // console.log(username, "hi");
    loginUser = req.user.userId;

    console.log(req.user, "hi");
    try {
      let user = await User.findOne({ username });
      if (!user) return res.json({ success: false, msg: "user not found" });
      if (!user.following.includes(loginUser)) {
        let follow = await User.findByIdAndUpdate(
          { username },
          { $push: { followers: req.user.userId } },
          { new: true }
        );
        await User.findByIdAndUpdate(req.user.userId, {
          $push: { following: follow.id },
        });
        res.json({ success: true, follow });
      } else {
        res.json({ msg: `you have already followed the ${username}`, follow });
      }
    } catch (error) {
      res.json({ msg: "issue in following" });
    }
  },
};
