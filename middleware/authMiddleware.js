const jwt = require("jsonwebtoken");
const jWT_SECRET = process.env.JWT_SECRET;
const {ParentModel,ChildModel} = require('../models/userModel'); // Assuming you have a Parent model
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



const verifyParent = async (req, res, next) => {
    const token = req.headers.authorization;

    if (!token) {
        return res.status(403).json({ message: "No token provided" });
    }

    try {
        // Verify the token
        const decoded = jwt.verify(token, jWT_SECRET);

        // Check if the user is a parent
        const parent = await ParentModel.findById(decoded.id);
        if (!parent) {
            return res.status(401).json({ message: "User is not a parent" });
        }

        // Check if the provided child ID belongs to the parent
        const childId = req.params.childId; // Assuming childId is in the request parameters
        if (!childId) {
            return res.status(400).json({ message: "Child ID is required" });
        }

        const child = await ChildModel.findById(childId);
        if (!child || child.parent.toString() !== parent._id.toString()) {
            return res.status(401).json({ message: "Access denied. Child does not belong to the parent" });
        }

        req.decoded = decoded;
        next();
    } catch (err) {
      console.log(err);
        return res.status(401).json({ message: "Failed to authenticate token" });
    }
};

module.exports = {
    verifyToken,
    verifyParent
};

