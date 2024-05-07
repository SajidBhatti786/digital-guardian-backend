const Camera = require("../models/cameraModel");
const cloudinary = require("cloudinary");
const {uploadSingleFile, uploadSingleFileFromURI} = require("../utils/fileUploadUtil");
//add a photo
exports.addPhoto = async (req, res) => {
    let childId = req.decoded.id



  if (!childId) {
    return res.status(400).json({ error: "Child ID is required" });
  }
  
  try {
   
   
    const { uri } = req.body;
  
      // Upload the new profile image to Cloudinary
      const newImage = await uploadSingleFileFromURI(uri);
      console.log(newImage);
      // Update the user's profile image URL in the database
        const camera = await Camera.create({
            imageUrl: newImage.imageUrl,
            childId: childId,
        });
        
        await camera.save()
  

    
    return res.status(201).json({ message: "Camera Image added successfully", camera });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

//get last 10 uploaded photos along with time
exports.getPhotos = async (req, res) => {
  const { childId } = req.params;
  try {
    // Find the location associated with the child ID
    const camera = await Camera.find({ childId: childId }).sort({ timestamp: -1 }).limit(10);
    if (!camera) {
      return res.status(404).json({ error: "Camera Images not found" });
    }
    return res.status(200).json({ camera });
  } catch (error) {
    return res.status(500).json({ error: "Internal Server Error" });
  }
};