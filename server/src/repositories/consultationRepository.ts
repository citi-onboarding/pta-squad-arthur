import prisma from "@database";
import { Prisma, Consultation } from "@prisma/client";

class ConsultationRepository {

  async create(data: Prisma.ConsultationUncheckedCreateInput): Promise<Consultation> {
    const Consultaion = await prisma.consultation.create({data: data});
    return Consultaion;
    
  }

  async findAll(): Promise<Consultation[]> {
    const consultations = await prisma.consultation.findMany();
    return consultations;
  }

  async findById(id: string): Promise<Consultation | null>{
    const consultation = await prisma.consultation.findUnique({where: {id: id}}) ;
    return consultation;
  }

  async update(id: string, data: Prisma.ConsultationUpdateInput): Promise<Consultation> {
    const consultatioUpdate = await prisma.consultation.update({where: {id: id}, data: data});
    return consultatioUpdate;
  }

  async delete(id: string): Promise<Consultation> {
    const Consultation = await prisma.consultation.delete({where:{id: id}});
    return Consultation;
  }
}

export default new ConsultationRepository();