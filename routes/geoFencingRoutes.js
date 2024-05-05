const express = require('express');
const router = express.Router();
const geoFencingController = require('../controllers/geoFencingController');
const authMiddleware = require('../middleware/authMiddleware');



router.post('/:childId', authMiddleware.verifyParent,geoFencingController.addGeoFencing);
// router.post('/create-geofence',geoFencingController.createGeofence);
// router.get('/check-geofence',geoFencingController.checkGeofence); 



// Update geo-fencing data routeg
router.put('/:childId',authMiddleware.verifyParent, geoFencingController.updateGeoFencing);

// Get geo-fencing data route
router.get('/:childId', authMiddleware.verifyParent,geoFencingController.getGeoFencing);

module.exports = router;