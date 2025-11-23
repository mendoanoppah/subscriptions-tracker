import { Router } from "express";
import { sendReminders } from "../controllers/workflows-controller.js";

const workflowRouter = Router();

workflowRouter.post("/subscription/reminder", sendReminders);

export default workflowRouter;