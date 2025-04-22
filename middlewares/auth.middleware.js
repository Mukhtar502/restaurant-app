const jwt = require("jsonwebtoken");
const User = require("../models/user.model");

async function protect(req, res, next) {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "Not authorized..." });
  }
  const token = authHeader.split(" ")[1];
  try {
    const verifiedToken = jwt.verify(token, process.env.JWT_SECRET);

    req.user = await User.findById(verifiedToken.userId).select("-password");
    next();
  } catch (error) {
    res.status(401).json({ message: "Invalid or expired token" });
  }
}
module.exports = protect;
