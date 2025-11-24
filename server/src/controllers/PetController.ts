import { Request, Response, NextFunction } from "express";
import petRepository from "../repositories/PetRepository";
import { PetSchema, UpdatePetSchema } from "../DTOs/Pet";

class PetController {
  async create(req: Request, res: Response, next: NextFunction) {
    try {
      const data = PetSchema.parse(req.body);
      const created = await petRepository.create(data);
      return res.status(201).json(created);
    } catch (error) {
      next(error);
    }
  }

  async findAll(req: Request, res: Response, next: NextFunction) {
    try {
      const pets = await petRepository.findAll();
      return res.status(200).json(pets);
    } catch (error) {
      next(error);
    }
  }

  async findById(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;

      const pet = await petRepository.findById(id);
      if (!pet) {
        return res.status(404).json({ message: "Pet não encontrado" });
      }

      return res.status(200).json(pet);
    } catch (error) {
      next(error);
    }
  }

  async update(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const data = UpdatePetSchema.parse(req.body);

      const updated = await petRepository.update(id, data);
      return res.status(200).json(updated);
    } catch (error) {
      next(error);
    }
  }

  async delete(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      await petRepository.delete(id);
      return res.status(204).send();
    } catch (error) {
      next(error);
    }
  }
}

export default new PetController();
