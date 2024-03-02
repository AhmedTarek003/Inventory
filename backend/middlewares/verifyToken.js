const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (authHeader) {
    const token = authHeader.split(" ")[1];
    if (token) {
      try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
        req.user = decoded;
        next();
      } catch (error) {
        return res
          .status(400)
          .json({ msg: "Invalid token, please login again" });
      }
    } else {
      return res.status(400).json({ msg: "no token provided" });
    }
  } else {
    return res.status(400).json({ msg: "no authorization found" });
  }
};
module.exports = verifyToken;
