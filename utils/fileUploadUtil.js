// File: fileUploadUtils.js

const multer = require("multer");
const axios = require("axios");

// Configure Cloudinary
const cloudinary = require("cloudinary").v2;
const streamifier = require("streamifier");

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Set up Multer for handling file uploads
const storage = multer.memoryStorage(); // Store files in memory as buffers
const upload = multer({ 
    storage: storage,
    limits: {
        fileSize: 10 * 1024 * 1024, // Adjust the file size limit as needed (e.g., 10 MB)
        fields: 1, // Limit the number of non-file fields in a multipart form
        fieldSize: 1024 * 1024, // Adjust the field size limit as needed (e.g., 1 MB)
      },
  });

// Function to upload a single file to Cloudinary

const uploadSingleFileFromURI = async (uri) => {
  try {
    // Fetch the image data from the URI
    const response = await axios.get(uri, {
      responseType: "arraybuffer" // Ensure binary response
    });

    // Create a buffer from the image data
    const imageBuffer = Buffer.from(response.data, "binary");

    // Upload the image buffer to Cloudinary
    const result = await new Promise((resolve, reject) => {
      const stream = cloudinary.uploader.upload_stream(
        {
          folder: "images",
        },
        (error, result) => {
          if (error) {
            reject(error);
          } else {
            resolve(result);
          }
        }
      );

      stream.write(imageBuffer);
      stream.end();
    });

    return {
      imageUrl: result.secure_url,
      publicId: result.public_id,
    };
  } catch (error) {
    console.error(error);
    throw new Error("Failed to upload file from URI to Cloudinary");
  }
};

const uploadSingleFile = async (file) => {
  try {
    const result = await new Promise((resolve, reject) => {
      const stream = cloudinary.uploader.upload_stream(
        {
          folder: "images",
        },
        (error, result) => {
          if (error) {
            reject(error);
          } else {
            resolve(result);
          }
        }
      );

      streamifier.createReadStream(file.buffer).pipe(stream);
    });

    return {
      imageUrl: result.secure_url,
      publicId: result.public_id,
    };
  } catch (error) {
    console.error(error);
    throw new Error("Failed to upload file to Cloudinary");
  }
};

const uploadMultipleFiles = async (files) => {
  const uploadedFilesInfo = [];
  console.log(files);

  try {
    await Promise.all(
      files.map(async (file) => {
        const result = await new Promise((resolve, reject) => {
          const stream = cloudinary.uploader.upload_stream(
            {
              folder: "images",
              public_id: `${Date.now()}`,
              resource_type: "auto",
              encoding: "7bit",
            },
            (error, result) => {
              if (error) {
                reject(error);
              } else {
                resolve(result);
              }
            }
          );

          streamifier.createReadStream(file.buffer).pipe(stream);
        });

        uploadedFilesInfo.push({
          imageUrl: result.secure_url,
          publicId: result.public_id,
        });
      })
    );

    return uploadedFilesInfo;
  } catch (error) {
    console.error(error);
    throw new Error("Failed to upload files to Cloudinary");
  }
};

const uploadSingleMiddleware = upload.single("image"); // Middleware for single file upload
const uploadMultipleMiddleware = upload.array("images"); // Middleware for multiple file upload

module.exports = {
  uploadSingleFile,
  uploadMultipleFiles,
  uploadSingleFileFromURI,
  uploadSingleMiddleware,
  uploadMultipleMiddleware,
};
