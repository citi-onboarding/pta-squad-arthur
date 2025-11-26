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
      return res.status(201).json({message: 'Consultation created.', data: consultation});
    } catch (error) {

      if (error instanceof ZodError){
        return res.status(400).json({message: "Invalid request data.",
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
      
      const consultation = await consultationRepository.findById(id);

      if (!consultation){
        return res.status(404).json({ message: "Consultation not found." });
      }

      return res.status(200).json(consultation);

    } catch (error) {
      next(error);
    }
  }

  // add
  async findByDoctor(req: Request, res: Response, next: NextFunction){
    try{
      const{ doctorName } = req.params;

      const consultations = await consultationRepository.findByDoctor(doctorName)

      if (consultations.length === 0){
        return res.status(404).json({message: "No consultation from this doctor were found."})
      }

      return res.status(200).json(consultations)
    } catch (error){
      next(error)
    }
  }


  //add
  async findByDatetime(req: Request, res: Response, next: NextFunction){
    try{

      const { datetime_str } = req.params;
      const datetime = new Date(datetime_str)

      if (isNaN(datetime.getTime())){

        return res.status(400).json({ error: "Invalid date format."})
      }

      const consultations = await consultationRepository.findByDatetime(datetime)

      if (consultations.length === 0){
        return res.status(404).json({ message: "Consulations not found on this period."})
      }

      return res.status(200).json(consultations)

    }catch (error){
      next(error)
    }
  }

  async findByPatientId(req: Request, res: Response, next: NextFunction){
    try{
      const { patientId } = req.params;
      const consultations = await consultationRepository.findByPatientId(patientId)

      if(consultations.length === 0) {

        return res.status(404).json({ message: "No consultations for this patient were found."})
      }

      return res.status(200).json({consultations})

    }catch(error){
      next(error)
    } 
  }

  //add
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