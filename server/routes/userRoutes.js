import { getPublishedImage, getUser, loginUser, registerUser } from "../controllers/userController.js";
import {Router} from 'express';
import { protect } from "../middlewares/auth.middleware.js";
import express from 'express'

const router = Router();

router.route("/register").post(registerUser);
router.route("/login").post(loginUser);
router.route("/data").get(protect, getUser);
router.route("/published-image").get(getPublishedImage);

export default router;