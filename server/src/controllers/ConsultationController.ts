import { Request, Response, NextFunction } from 'express';
import { ZodError } from 'zod';
import consultationRepository from '../repositories/consultationRepository';
import { ConsultationSchema, UpdateConsultationSchema } from '../DTOs/Consultaion';

class ConsultationController {
  
  
  async create(req: Request, res: Response, next: NextFunction) {
    try {
      
    const rawData = req.body; 
    
    
    if(rawData.date && rawData.date.includes('/')){ 
      const parts = rawData.date.split('/'); // [day, month, year]        
    
      if(parts.length === 3){
        
        if (parts[0].length === 1) { parts[0] = "0" + parts[0]; }
        if(parts[1].length === 1){ parts[1] = "0" + parts[1]; }

        const isoDate = `${parts[2]}-${parts[1]}-${parts[0]}`;
        rawData.date = isoDate;
      }

      
    }
    
    const combinedDateTime = `${rawData.date}T${rawData.time}:00`; 
    
    rawData.datetime = combinedDateTime;
    
    
    delete rawData.date; 
    delete rawData.time;
    
    const consultationdata = ConsultationSchema.parse(rawData);

    if (consultationdata.datetime) {
      consultationdata.datetime.setSeconds(0, 0); 
    }
    
      
    const consultation = await consultationRepository.create(consultationdata);

      
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
  async findByDateRange(req: Request, res: Response, next: NextFunction){
    try{

      const { dateString } = req.params; 
      
      let formattedDateString = dateString;
    
      if(dateString && dateString.includes('/')){

        const parts = dateString.split('/'); // [day, month, year]        
        
        if (parts.length === 3){
          
          if(parts[0].length === 1){ parts[0] = "0" + parts[0];}

          if(parts[1].length === 1){ parts[1] = "0" + parts[1];}

          formattedDateString  = `${parts[2]}-${parts[1]}-${parts[0]}`;
        
        } else{

          return res.status(400).json({ error: "Invalid date format. Expected DD/MM/AAAA"});
          }
        }

        const startDate = new Date(formattedDateString);

        if (isNaN(startDate.getTime())){

        return res.status(400).json({ error: "Invalid date value or unrecognized format."});

        }

        const endDate = new Date(startDate);
        endDate.setDate(startDate.getDate() + 1);

        const consultations = await consultationRepository.findByDateRange(startDate, endDate);

        if (consultations.length === 0) {

        return res.status(404).json({ message: "Consultations not found on this day."});

        }

        return res.status(200).json(consultations);

    }catch (error){
      next(error)
    }
  }

  //add
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