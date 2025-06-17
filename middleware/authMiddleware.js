const jwt = require("jsonwebtoken");
const User = require("../models/User");

const authMiddleware = async (req, res, next) => {
  try {
    const Authorization = req.headers.authorization;

    if (!Authorization || !Authorization.startsWith("Bearer ")) {
      return res.status(401).json({ message: "No token provided" });
    }

    const token = Authorization.split(" ")[1];

    const info = jwt.verify(token, process.env.JWT_SECRET);

    // Fix here — use `info.id` if that's what you signed
    const user = await User.findById(info.id).select("-password");

    if (!user) {
      return res.status(401).json({ message: "Invalid token: user not found" });
    }

    req.user = user;
    next();
  } catch (err) {
    console.error(err);
    return res.status(403).json({ message: "Unauthorized: Invalid token" });
  }
};

module.exports = authMiddleware;
