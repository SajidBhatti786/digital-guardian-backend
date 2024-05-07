const Screen = require("../models/screencastModel");
const cloudinary = require("cloudinary");
const {uploadSingleFile} = require("../utils/fileUploadUtil");
//add a photo
exports.addPhoto = async (req, res) => {
    let childId = req.decoded.id


  if (!childId) {
    return res.status(400).json({ error: "Child ID is required" });
  }
  if (!req.file) {
    return res.status(400).json({ error: "Image is required" });
  }
  try {
   
    console.log("file: ",req.file)
   
  
      // Upload the new profile image to Cloudinary
      const newImage = await uploadSingleFile(req.file);
      console.log(newImage);
      // Update the user's profile image URL in the database
        const screen = await Screen.create({
            imageUrl: newImage.imageUrl,
            childId: childId,
        });
        
        await screen.save()
  

    
    return res.status(201).json({ message: "Screen Image added successfully", screen });
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
    const screen = await Screen.find({ childId: childId }).sort({ timestamp: -1 }).limit(20);
    if (!screen) {
      return res.status(404).json({ error: "Screen Images not found" });
    }
    return res.status(200).json({ screen });
  } catch (error) {
    return res.status(500).json({ error: "Internal Server Error" });
  }
};