import express from "express";

const router = express.Router();
import {requireSignin} from '../middleware/index'
import { register, login,resetPassword,updatePassword ,updatePassword2,updateallDetails} from "../controllers/auth";

router.post("/register", register);
router.post("/login", login);
router.post('/resetPassword',resetPassword);
router.post('/updatePassword',updatePassword);
router.post('/updatePassword2',requireSignin,updatePassword2);
router.post('/updateallDetails',requireSignin,updateallDetails);

module.exports = router;
 