const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/authMiddleware");
const childAuthController = require("../controllers/childAuthController");

router.post(
  "/parent/create-child",
  authMiddleware.verifyToken,
  childAuthController.createChild
);
router.post("/child/login", childAuthController.loginChild); // Changed this line

module.exports = router;
