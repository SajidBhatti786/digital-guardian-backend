const express = require('express');
const router = express.Router();
const geoFencingController = require('../controllers/geoFencingController');
const authMiddleware = require('../middleware/authMiddleware');
router.post('/:childId', authMiddleware.verifyParent,geoFencingController.addGeoFencing);

// Update geo-fencing data route
router.put('/:childId',authMiddleware.verifyParent, geoFencingController.updateGeoFencing);

// Get geo-fencing data route
router.get('/:childId', authMiddleware.verifyParent,geoFencingController.getGeoFencing);

module.exports = router;