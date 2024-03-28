const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/authMiddleware");
const childAuthController = require("../controllers/childAuthController");
const locationController = require("../controllers/locationController");
router.post(
  "/add-location",
  authMiddleware.verifyToken,
  locationController.addLocation
);
router.put(
    "/update-location",
    authMiddleware.verifyToken,
    locationController.updateLocation
  );
  router.get(
    "/get-location/:childId",
    authMiddleware.verifyParent,
    locationController.getLocation
  );
// router.post("/child/login", childAuthController.loginChild); // Changed this line

module.exports = router;
