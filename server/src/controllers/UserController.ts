import { Request, Response, NextFunction } from 'express';
import userRepository from 'src/repositories/userRepository';
import { User, UpdateUser } from 'src/DTOs/User';

class UserController {
  async create(req: Request, res: Response, next: NextFunction) {
    try {
      const userData = User.parse(req.body);
      const user = await userRepository.create(userData);

      return res.status(201).json({
        message: 'User created',
        data: user,
      });
    } catch (error) {
      return next(error);
    }
  }

  async findAll(req: Request, res: Response, next: NextFunction) {
    try {
      const users = await userRepository.findAll();

      return res.status(200).json(users);
    } catch (error) {
      return next(error);
    }
  }

  async findById(req: Request, res: Response, next: NextFunction) {
    try {

      const { id } = req.params;
      const user = await userRepository.findById(parseInt(id));

      if (!user) {
        return next({
          status: 404,
          message: 'User not found',
        });
      }

      return res.status(200).json(user);
    } catch (error) {
      return next(error);
    }
  }

  async update(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const userData = UpdateUser.parse(req.body);

      const user = await userRepository.update(parseInt(id), userData);

      return res.status(200).json({
        message: 'User updated',
        data: user,
      });
    } catch (error) {
      return next(error);
    }
  }

  async delete(req: Request, res: Response, next: NextFunction) {
      try {
        const { id } = req.params;
  
        await userRepository.delete(parseInt(id));
  
        return res.status(200).json({
          message: 'User deleted',
        });
      } catch (error) {
        return next(error);
      }
    }
}

export default new UserController();