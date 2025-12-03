import { Router } from "express";
import { EmailController } from "../controllers/EmailController";

const emailRoutes = Router();
const emailController = new EmailController();

// Chama o método sendConfirmation
emailRoutes.post("/send-email", emailController.sendConfirmation);

export { emailRoutes };