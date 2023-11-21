const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");

router.post("/parent/login", authController.login);
router.post("/parent/register", authController.register);

module.exports = router;
