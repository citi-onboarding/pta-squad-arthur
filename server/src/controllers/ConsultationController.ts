import { Request, Response, NextFunction } from 'express';
import { ZodError } from 'zod';
import consultationRepository from '../repositories/consultationRepository';
import { ConsultationSchema, UpdateConsultationSchema } from '../DTOs/Consultaion';

class ConsultationController {
  
  async create(req: Request, res: Response, next: NextFunction) {
    try {
      // 1. Validação
      const consultationdata = ConsultationSchema.parse(req.body);
      
      // 2. Chamada ao Repo
      const consultation = await consultationRepository.create(consultationdata);

      // 3. Resposta
      return res.status(201).json({message: 'Consultation created', data: consultation});
    } catch (error) {

      if (error instanceof ZodError){
        return res.status(400).json({message: "Invalid request data",
          details: error.issues.map(issue => ({
            field: issue.path.join('.'),
            message: issue.message,
          }))
        })
      }

      next(error);
    }
  }

  async findAll(req: Request, res: Response, next: NextFunction) {
    try {

      const consultations = await consultationRepository.findAll();

      return res.status(200).json(consultations);

    } catch (error) {
      
      next(error);
    }
  }

  async findById(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      // TODO: Buscar pelo ID. 
      // Se não encontrar (!result), retornar erro 404.
      // Se encontrar, retornar 200.
      const consultation = await consultationRepository.findById(id);

      if (!consultation){
        return res.status(404).json({ message: "Consultation not found" });
      }

      return res.status(200).json(consultation);

    } catch (error) {
      next(error);
    }
  }

  async update(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      // TODO: Validar o body com UpdateSchema
      const consultaiondata = UpdateConsultationSchema.parse(req.body);

      // TODO: Chamar o update do repositório e retornar o resultado
      const consultation = await consultationRepository.update(id, consultaiondata);

      return res.status(200).json({message: 'Consultation updated', data: consultation});

    } catch (error) {
      next(error);
    }
  }

  async delete(req: Request, res: Response, next: NextFunction) {
     try {
      const { id } = req.params;
      // TODO: Chamar o delete do repositório
      await consultationRepository.delete(id);
      // TODO: Retornar status 204 (No Content) ou 200 com mensagem
      return res.status(204).send();
    } catch (error) {
      next(error);
    }
  }
}

export default new ConsultationController();