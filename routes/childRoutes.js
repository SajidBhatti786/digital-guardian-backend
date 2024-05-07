const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/authMiddleware");
const CameraController = require("../controllers/CameraController");
const childAuthController = require("../controllers/childAuthController");
router.post(
  "/parent/create-child",
  authMiddleware.verifyToken,
  childAuthController.createChild,
  CameraController.addPhoto

);
router.post("/child/login", childAuthController.loginChild); // Changed this line

module.exports = router;
