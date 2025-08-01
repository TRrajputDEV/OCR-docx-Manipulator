// set user route here
import { Router } from "express";
import {home, uploadFile, downloadFile} from '../controllers/user.controller.js'
import {resizeImage,generateThumbnails, extractText} from '../controllers/processing.controller.js'
import {upload} from '../middlewares/multer.middleware.js'
const router = Router();
// existing
router.route('/home').post(home);
router.route('/uploadfile').post(upload.single('file'), uploadFile);
// New processing routes
router.route('/resize-image').post(resizeImage);
router.route('/generate-thumbnails').post(generateThumbnails);

// Download route
router.route('/download/:filename').get(downloadFile);

// ocr route
router.route("/extract-text").post(upload.single("file"), extractText);

export default router