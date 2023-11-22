const express = require("express");
const router = express.Router();
const parentAuthController = require("../controllers/parentAuthController");

router.post("/parent/login", parentAuthController.login);
router.post("/parent/register", parentAuthController.register);

module.exports = router;
