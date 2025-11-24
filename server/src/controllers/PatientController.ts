import { Request, Response, NextFunction } from "express";
import patientRepository from "../repositories/PatientRepository";
import { PatientSchema, UpdatePatientSchema } from "../DTOs/Patient";

// segue a arquitetura MVC. Aqui o controler irá verificar a requisição e mandar o repository trabalhar
// o repository é quem toca no BD
class PatientController {
  
  async create(req: Request, res: Response, next: NextFunction) {
    try {
      // req.body é o json enviado e o parse verifica se as colunas batem com o PatientSchema.
      const data = PatientSchema.parse(req.body); 
      
      // o anterior é a validação, caso passe, o repository irá incluir no bd
      const created = await patientRepository.create(data); 
      
      return res.status(201).json(created);
    } catch (error) {
      next(error);
    }
  }

  async findAll(req: Request, res: Response, next: NextFunction) {
    try {
      // Busca todos os pacientes
      const patients = await patientRepository.findAll();
      return res.status(200).json(patients);
    } catch (error) {
      next(error);
    }
  }

  async findById(req: Request, res: Response, next: NextFunction) {
    try {
      // pega o id da url
      const { id } = req.params;
      
      // procura no bd
      const patient = await patientRepository.findById(id);
      
      if (!patient) {
        // Mensagem atualizada para "Paciente"
        return res.status(404).json({ message: "Paciente não encontrado" });
      }

      return res.status(200).json(patient);
    } catch (error) {
      next(error);
    }
  }

  async update(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      
      // Verifica se o paciente existe antes de tentar atualizar
      const patient = await patientRepository.findById(id);
      if (!patient) { 
        return res.status(404).json({ message: "Paciente não encontrado" });
      }

      // é o que tem partial(), no DTO para que possa trocar apenas uma informação
      const data = UpdatePatientSchema.parse(req.body);

      const updated = await patientRepository.update(id, data);
      return res.status(200).json(updated);
    } catch (error) {
      next(error);
    }
  }

  async delete(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;      
      const patient = await patientRepository.findById(id);
      if (!patient) {
        return res.status(404).json({ message: "Paciente não encontrado" });
      }

      await patientRepository.delete(id);
      return res.status(204).send();
    } catch (error) {
      next(error);
    }
  }
}

// padrao singleton: https://refactoring.guru/pt-br/design-patterns/singleton
// com o new, cria-se uma nova instância do PatientController e a exporta "viva"
export default new PatientController();