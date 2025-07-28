// set user route here
import { Router } from "express";
import {home} from '../controllers/user.controller.js'

const router = Router();

router.route('/home').post(home);

export default router