// set user route here
import { Router } from "express";
import {home, uploadFile} from '../controllers/user.controller.js'
import {upload} from '../middlewares/multer.middleware.js'
const router = Router();

router.route('/home').post(home);
router.route('/uploadfile').post(upload.single('file'), uploadFile);
export default router