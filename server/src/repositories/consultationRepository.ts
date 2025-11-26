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

  async findById(id: string): Promise <Consultation | null>{
    const consultation = await prisma.consultation.findUnique({where: {id: id}}) ;
    return consultation;
  }

  // add finByDoctor
  async findByDoctor(doctorName: string): Promise < Array <Consultation> >{
    const consultations = await prisma.consultation.findMany({where: {doctorName: doctorName}})
    return consultations;
  }

  // add findByDatetime
  // doubt
  async findByDatetime(datetime: Date): Promise <Array<Consultation> | null> {
    const ConsultationByDateTime = await prisma.consultation.findMany({where: {datetime}})
    return ConsultationByDateTime;
  }

  // add findByPatientId
  async findByPatientId(patientId: string): Promise<Array<Consultation> | null>{
    const PatientConsultations = await prisma.consultation.findMany({where: {patientId}})
    return PatientConsultations;
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