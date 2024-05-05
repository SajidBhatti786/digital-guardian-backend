const express = require("express");
const router = express.Router();
const CameraController = require("../controllers/CameraController");
const { uploadSingleMiddleware } = require("../utils/fileUploadUtil");
const authMiddleware = require("../middleware/authMiddleware");

router.post('/add-photo',
uploadSingleMiddleware,
authMiddleware.verifyToken,
CameraController.addPhoto
)
router.get('/get-photos/:childId',
authMiddleware.verifyParent,
CameraController.getPhotos
)


module.exports = router;
