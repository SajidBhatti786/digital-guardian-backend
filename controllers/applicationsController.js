const Application = require('../models/applicationsModel');

// Add new application
async function addApplications(req, res) {
    const childId = req.decoded.id;
    console.log(childId);
    // console.log(req)
    console.log(req.body);

    try {
        const application = await Application.create({
            child: childId,
            applications: req.body
        });
        application.save();
       res.status(201).json({ message: 'Applications added successfully', application });
    } catch (error) {
        console.log(error);
        throw new Error('Failed to add applications');
    }
}


// Update application by ID
async function updateApplication(id, label, icon, usageTime) {
    try {
        const application = await Application.findByIdAndUpdate(id, {
            $set: { 'applications.$[elem].label': label, 'applications.$[elem].icon': icon, 'applications.$[elem].usageTime': usageTime }
        }, { arrayFilters: [{ 'elem._id': id }], new: true });
        if (!application) throw new Error('Application not found');
        return application;
    } catch (error) {
        throw new Error('Failed to update application');
    }
}

// Get applications for a specific ChildRef
async function getApplicationsForChildRef(childRefId) {
    try {
        const applications = await Application.find({ childRef: childRefId });
        return applications;
    } catch (error) {
        throw new Error('Failed to get applications for ChildRef');
    }
}

module.exports = { addApplications, updateApplication, getApplicationsForChildRef };
