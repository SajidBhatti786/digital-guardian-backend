const mongoose = require('mongoose');
const { Schema } = mongoose;

const geoFencingSchema = new Schema({
    child: { type: Schema.Types.ObjectId, ref: 'Child', required: true },
    latitude: { type: Number, required: true },
    longitude: { type: Number, required: true },
    radius: { type: Number, required: true }
});

const GeoFencing = mongoose.model('GeoFencing', geoFencingSchema);

module.exports = GeoFencing;
