const jwt = require("jsonwebtoken");

exports.verifyToken = async (req, res, next) => {
  let token = await req.headers.authorization;
  try {
    if (token) {
      jwt.verify(token, process.env.SECRET, (error, decoded) => {
        if (error) return next(error);
        req.user = {
          userId: decoded.userId,
          email: decoded.email,
          token,
        };

        console.log(req.user.userId, token);

        next();
      });
    } else {
      res.status(401).json({ success: false, message: "Token not found" });
    }
  } catch (error) {
    res.json(error);
  }
};
