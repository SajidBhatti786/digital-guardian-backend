const Location = require('../models/locationModel');

// Controller to add location data
exports.addLocation = async (req, res) => {
    // Add logic to verify parent using token in header
    // Assuming token verification logic here
    let childId = req.decoded.id
    if(!childId){
        return res.status(400).json({ error: 'Child ID is required' });
    }   
    const existingLocation = await Location.findOne({ child: childId });
        if (existingLocation) {
            return res.status(400).json({ error: 'Location already added for this child, can only be updated' });
        }
    const {  latitude, longitude, latitudeDelta, longitudeDelta } = req.body;
    if(!latitude || !latitudeDelta || !latitudeDelta || !longitudeDelta){
        return res.status(400).json({ error: 'Latitude, longitude, latitudeDelta and longitudeDelta are required' });
    }
    try {
        const location = await Location.create({
            child: childId,
            latitude,
            longitude,
            latitudeDelta,
            longitudeDelta
        });
        return res.status(201).json({ message: 'Location added successfully', location });
    } catch (error) {
        return res.status(500).json({ error: 'Internal Server Error' });
    }
};

// Controller to update location data
exports.updateLocation = async (req, res) => {
    const childId = req.decoded.id;
    if (!childId) {
        return res.status(400).json({ error: 'Child ID is required' });
    }

    const { latitude, longitude, latitudeDelta, longitudeDelta } = req.body;
    if (!latitude || !longitude || !latitudeDelta || !longitudeDelta) {
        return res.status(400).json({ error: 'Latitude, longitude, latitudeDelta, and longitudeDelta are required' });
    }

    try {
        // Find the location associated with the child ID
        const location = await Location.findOneAndUpdate({ child: childId }, {
            latitude,
            longitude,
            latitudeDelta,
            longitudeDelta
        }, { new: true });

        if (!location) {
            return res.status(404).json({ error: 'Location not found' });
        }

        return res.status(200).json({ message: 'Location updated successfully', location });
    } catch (error) {
        return res.status(500).json({ error: 'Internal Server Error' });
    }
};


// Controller to get location data
exports.getLocation = async (req, res) => {
    // Add logic to verify parent using token in header
    // Assuming token verification logic here

    const { childId } = req.params;
    try {
        // Find the location associated with the child ID
        const location = await Location.findOne({ child: childId });
        if (!location) {
            return res.status(404).json({ error: 'Location not found' });
        }
        return res.status(200).json({ location });
    } catch (error) {
        return res.status(500).json({ error: 'Internal Server Error' });
    }
};
