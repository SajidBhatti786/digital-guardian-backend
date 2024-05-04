const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/authMiddleware");
const childAuthController = require("../controllers/childAuthController");
const locationController = require("../controllers/locationController");
const applicationsController = require("../controllers/applicationsController");
router.post(
  "/add-apps",
  authMiddleware.verifyToken,
  applicationsController.addApplications
);
router.put(
    "/update-apps",
    authMiddleware.verifyToken,
    locationController.updateLocation
  );
  router.get(
    "/get-apps/:childId",
    authMiddleware.verifyParent,
    locationController.getLocation
  );
// router.post("/child/login", childAuthController.loginChild); // Changed this line

module.exports = router;
