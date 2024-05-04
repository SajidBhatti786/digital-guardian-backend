const mongoose = require('mongoose');
const { Schema } = mongoose;

const applicationSchema = new mongoose.Schema({
    child: { type: Schema.Types.ObjectId, ref: 'Child', required: true }
    ,
    applications: [{
        label: String,
        icon: String,
        packageName: String
    }]
});

const Application = mongoose.model('Application', applicationSchema);

module.exports = Application;
