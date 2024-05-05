
const GeoFencing = require('../models/geoFencingModel');

// Controller to add geo-fencing data
exports.addGeoFencing = async (req, res) => {
    const { childId } = req.params;
    const { latitude, longitude, radius } = req.body;
    if(!latitude || !longitude || !radius){
        return res.status(400).json({ error: 'All fields are required' });
    }
    const existingGeoFencing = await GeoFencing.findOne({ child: childId });

    // if (existingGeoFencing) {
    //     return res.status(400).json({ error: 'Geo-fencing data already exists for this child. Please update instead.' });
    // }
    try {
        if(existingGeoFencing){
            const geoFencing = await GeoFencing.findOneAndUpdate({ child : childId }, {
                latitude,
                longitude,
                radius
            }, { new: true });
            if (!geoFencing) {
                return res.status(404).json({ error: 'Geo-fencing data not found' });
            }
            return res.status(200).json({ message: 'Geo-fencing data updated successfully', geoFencing });

        }else{
            const geoFencing = await GeoFencing.create({
                child: childId,
                latitude,
                longitude,
                radius
            });
            return res.status(201).json({ message: 'Geo-fencing data added successfully', geoFencing });

        }
        
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
};

// Controller to update geo-fencing data
exports.updateGeoFencing = async (req, res) => {
    const { childId } = req.params;
    const { latitude, longitude, radius } = req.body;
    if(!latitude || !longitude || !radius){
        return res.status(400).json({ error: 'All fields are required' });
    }
    try {
        const geoFencing = await GeoFencing.findOneAndUpdate({ child : childId }, {
            latitude,
            longitude,
            radius
        }, { new: true });
        if (!geoFencing) {
            return res.status(404).json({ error: 'Geo-fencing data not found' });
        }
        return res.status(200).json({ message: 'Geo-fencing data updated successfully', geoFencing });
    } catch (error) {
        return res.status(500).json({ error: 'Internal Server Error' });
    }
};

// Controller to get geo-fencing data
exports.getGeoFencing = async (req, res) => {
    const { childId } = req.params;
    
    try {
        const geoFencing = await GeoFencing.findOne({ child: childId});
        if (!geoFencing) {
            return res.status(404).json({ error: 'Geo-fencing data not found' });
        }
        return res.status(200).json({ geoFencing });
    } catch (error) {
        return res.status(500).json({ error: 'Internal Server Error' });
    }
};


// module.exports = {addGeoFencing,createGeofence,get}

// // Define your API key
// const API_KEY = 'AIzaSyCiYhcGlXkQ_ipGEDVLFHQ_Z6y-Cw_Juuc';

// // Define the endpoint URLs
// const createGeofenceUrl = `https://www.googleapis.com/geolocation/v1/geofence?key=${API_KEY}`;
// const checkGeofenceUrl = `https://www.googleapis.com/geolocation/v1/geofence:check?key=${API_KEY}`;
// const axios = require('axios');
// // Function to create a geofence
// async function createGeofence(req,res) {
//   const data = {
//     "geofence": {
//       "name": "Sample Geofence",
//       "latitude": 37.4220041,
//       "longitude": -122.0862462,
//       "radius": 100 // in meters
//     }
//   };

//   try {
//     const response = await axios.post(createGeofenceUrl, data);
//     console.log('Geofence created successfully:', response.data);
//   } catch (error) {
//     console.error('Error creating geofence:', error);
//   }
// }

// // Function to check if a location is within the geofence
// async function checkGeofence(req,res) {
//   const data = {
//     "homeMobileCountryCode": 310,
//     "homeMobileNetworkCode": 410,
//     "radioType": "gsm",
//     "considerIp": "false",
//     "cellTowers": [],
//     "wifiAccessPoints": []
//   };

//   try {
//     const response = await axios.post(checkGeofenceUrl, data);
//     console.log('Geofence check result:', response.data);
//   } catch (error) {
//     console.error('Error checking geofence:', error.message);
//   }
// }

// // Example usage
// // createGeofence();

// // Example usage to check if a location is within the geofence
// // const locationToCheck = {
// //   latitude: 37.4220041,
// //   longitude: -122.0862462
// // };
// // checkGeofence(locationToCheck.latitude, locationToCheck.longitude);
// module.exports = {checkGeofence,createGeofence}