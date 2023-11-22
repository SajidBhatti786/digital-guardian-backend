const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/authMiddleware");

const parentController = require("../controllers/parentController");

router.get(
  "/parent/get-all-Children",
  authMiddleware.verifyToken,
  parentController.getAllChildren
);
// router.post("/parent/register", parentAuthController.register);

module.exports = router;
