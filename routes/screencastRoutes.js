const express = require("express");
const router = express.Router();
const ScreencastController = require("../controllers/screencastController");
const { uploadSingleMiddleware } = require("../utils/fileUploadUtil");
const authMiddleware = require("../middleware/authMiddleware");

router.post('/add-photo',
uploadSingleMiddleware,
authMiddleware.verifyToken,
ScreencastController.addPhoto
)
router.get('/get-photos/:childId',
authMiddleware.verifyParent,
ScreencastController.getPhotos
)


module.exports = router;
