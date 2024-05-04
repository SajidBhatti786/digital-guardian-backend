const GeoFencing = require('../models/geoFencingModel');

// Controller to add geo-fencing data
exports.addGeoFencing = async (req, res) => {
    const { childId } = req.params;
    const { latitude, longitude, radius } = req.body;
    if(!latitude || !longitude || !radius){
        return res.status(400).json({ error: 'All fields are required' });
    }
    const existingGeoFencing = await GeoFencing.findOne({ child: childId });

    if (existingGeoFencing) {
        return res.status(400).json({ error: 'Geo-fencing data already exists for this child. Please update instead.' });
    }
    try {
        const geoFencing = await GeoFencing.create({
            child: childId,
            latitude,
            longitude,
            radius
        });
        return res.status(201).json({ message: 'Geo-fencing data added successfully', geoFencing });
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
