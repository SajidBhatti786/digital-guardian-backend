const jwt = require("jsonwebtoken");
const jWT_SECRET = process.env.JWT_SECRET;

// Middleware to verify the token
const verifyToken = (req, res, next) => {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(403).json({ message: "No token provided" });
  }

  jwt.verify(token, jWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(401).json({ message: "Failed to authenticate token" });
    }
    req.decoded = decoded;
    next();
  });
};

module.exports = {
  verifyToken,
};
