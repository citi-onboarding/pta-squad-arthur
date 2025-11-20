import { Router } from 'express';
import userController from 'src/controllers/UserController';

const UserRouter = Router();

UserRouter.post("/", userController.create);
UserRouter.get("/", userController.get);
UserRouter.delete("/:id", userController.delete);
UserRouter.patch("/:id", userController.update);

export default UserRouter;