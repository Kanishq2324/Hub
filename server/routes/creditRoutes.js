import {Router} from 'express';
import { protect } from "../middlewares/auth.middleware.js";
import { getPlans, purchasePlan, verifyPayment } from '../controllers/creditController.js';

const creditRouter = Router();

creditRouter.route("/plans").get(protect, getPlans);
creditRouter.route("/purchase").post(protect, purchasePlan);
creditRouter.route("/verify-payment").post(verifyPayment);

export default creditRouter;