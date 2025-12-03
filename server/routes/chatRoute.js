import {Router} from 'express';
import { protect } from "../middlewares/auth.middleware.js";
import express from 'express'
import { createChat, deleteChat, getChats } from "../controllers/chatController.js";

const chatRouter = Router();

chatRouter.route("/create").get(protect, createChat);
chatRouter.route("/get").get(protect, getChats);
chatRouter.route("/delete").post(protect, deleteChat);

export default chatRouter;