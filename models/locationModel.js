const mongoose = require('mongoose');
const { Schema } = mongoose;

const locationSchema = new Schema({
    child: { type: Schema.Types.ObjectId, ref: 'Child' },
    latitude: Number,
    longitude: Number,
    latitudeDelta: Number,
    longitudeDelta: Number
});

const Location = mongoose.model('Location', locationSchema);

module.exports = Location;
