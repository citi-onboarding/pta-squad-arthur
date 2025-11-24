import { Router } from "express";
import ConsultationController from "src/controllers/ConsultationController";

const ConsultationRouter = Router();

ConsultationRouter.post("/", ConsultationController.create);
ConsultationRouter.get("/", ConsultationController.findAll );
ConsultationRouter.get("/:id",ConsultationController.findById );
ConsultationRouter.delete("/:id", ConsultationController.delete);
ConsultationRouter.patch("/:id", ConsultationController.update);

export default ConsultationRouter;