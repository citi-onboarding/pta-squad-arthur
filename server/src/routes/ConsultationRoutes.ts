import { Router } from "express";
import ConsultationController from "src/controllers/ConsultationController";
import consultationRepository from "src/repositories/consultationRepository";

const ConsultationRouter = Router();

ConsultationRouter.post("/", ConsultationController.create);
ConsultationRouter.get("/", ConsultationController.findAll );
ConsultationRouter.get("/:id", ConsultationController.findById );

//add
ConsultationRouter.get("/doctor/:doctorName", ConsultationController.findByDoctor)
ConsultationRouter.get("/date/:dateTime", ConsultationController.findByDatetime)
ConsultationRouter.get("/patient/:patientId", ConsultationController.findByPatientId)

ConsultationRouter.delete("/:id", ConsultationController.delete);
ConsultationRouter.patch("/:id", ConsultationController.update);

export default ConsultationRouter;