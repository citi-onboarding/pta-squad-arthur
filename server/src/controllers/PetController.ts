import { Request, Response, NextFunction } from "express";
import petRepository from "../repositories/PetRepository";
import { PetSchema, UpdatePetSchema } from "../DTOs/Pet";


// segue a arquitetura MVC. Aqui o controler irá verificar a requisição e mandar o repository trabalhar
// o repository é quem toca no BD
class PetController {
  async create(req: Request, res: Response, next: NextFunction) {
    try {
      const data = PetSchema.parse(req.body); //req.body é o json enviado e o parse verifica se as colunas batem.
      const created = await petRepository.create(data); //o anterior é a validação, caso passe, o repository irá incluir no bd
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
      //pega o id da url
      const { id } = req.params;
      //procura no bd
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
      const pet = await petRepository.findById(id);
      if (!pet) { 
        return res.status(404).json({ message: "Pet não encontrado" });
      }
      //é o que tem partial(), no DTO para que possa trocar apenas uma informação, sem ser preciso enviar tudo sempre
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

// padrao singleton: https://refactoring.guru/pt-br/design-patterns/singleton, usando o new, faz com que não seja preciso criar um novo
// controlador toda vez que alguém chamar uma rota
// com o new, cria-se uma nova instância do petController
export default new PetController();
