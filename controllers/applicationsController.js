const Application = require('../models/applicationsModel');

// Add new application
async function addApplications(req, res) {
    const childId = req.decoded.id;
    console.log(req.body)
    console.log(childId);
    
    
    try {
        // Check if applications already exist for the child
        // const existingApps = await Application.findOne({ child: childId });
        
        // if (existingApps) {
        //     // If applications exist, update them
        //     existingApps.applications = req.body;
        //     await existingApps.save();
        //     return res.status(200).json({ message: "Applications updated successfully", applications: existingApps });
        // } else {
            // If applications don't exist, create them
            const newApplications = await Application.create({
                child: childId,
                applications: req.body
            });
            return res.status(201).json({ message: 'Applications added successfully', applications: newApplications });
        // }
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: 'Failed to add/update applications' });
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
async function getApplicationsForChildRef(req,res) {
    try {
        const childId = req.params.childId;
        const applications = await Application.find({ child: childId });
        console.log("applications: ",applications);
       if(applications){
        return res.status(200).json({ message: "Applications retrieved successfully", applications: applications });
       }else{
        return res.status(404).json({ message: "No applications found for ChildRef" });
       }
    } catch (error) {
        throw new Error('Failed to get applications for ChildRef');
    }
}

module.exports = { addApplications, updateApplication, getApplicationsForChildRef };
