import { Router } from 'express';
import UserController from 'src/controllers/UserController';

const UserRouter = Router();

UserRouter.post("/", UserController.create);
UserRouter.get("/", UserController.findAll);
UserRouter.get("/:id", UserController.findById);
UserRouter.delete("/:id", UserController.delete);
UserRouter.patch("/:id", UserController.update);

export default UserRouter;