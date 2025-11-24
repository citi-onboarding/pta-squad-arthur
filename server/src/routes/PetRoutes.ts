import { Router } from "express";
import PetController from "../controllers/PetController";

const router = Router();

router.post("/", PetController.create);
router.get("/", PetController.findAll);
router.get("/:id", PetController.findById);
router.patch("/:id", PetController.update);
router.delete("/:id", PetController.delete);

export default router;
