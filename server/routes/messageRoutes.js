import {Router} from 'express';
import { protect } from "../middlewares/auth.middleware.js";
import express from 'express'
import { imageMessageController, textMessageController } from '../controllers/messagesController.js';

const messageRouter = Router();

messageRouter.route("/text").post(protect, textMessageController);
messageRouter.route("/image").post(protect, imageMessageController);



export default messageRouter;