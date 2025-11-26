import prisma from "@database";
import { Prisma, Consultation } from "@prisma/client";

class ConsultationRepository {

  //tested
  async create(data: Prisma.ConsultationUncheckedCreateInput): Promise<Consultation> {
    const Consultaion = await prisma.consultation.create({data: data});
    return Consultaion;
    
  }

  // tested
  async findAll(): Promise< Array <Consultation>> {
    const consultations = await prisma.consultation.findMany();
    return consultations;
  }

  //tested (*consultation id)
  async findById(id: string): Promise <Consultation | null>{
    const consultation = await prisma.consultation.findUnique({where: {id: id}}) ;
    return consultation;
  }

  //tested
  // add finByDoctor
  async findByDoctor(doctorName: string): Promise < Array <Consultation> >{
    const consultations = await prisma.consultation.findMany({where: {doctorName: doctorName}})
    return consultations;
  }

  // add findByDatetime
  // doubt
  async findByDatetime(datetime: Date): Promise < Array <Consultation> > {
    const ConsultationByDateTime = await prisma.consultation.findMany({where: {datetime}})
    return ConsultationByDateTime;
  }

  //tested
  // add findByPatientId
  async findByPatientId(patientId: string): Promise< Array <Consultation> >{
    const PatientConsultations = await prisma.consultation.findMany({where: {patientId}})
    return PatientConsultations;
  }

  //tested
  async update(id: string, data: Prisma.ConsultationUpdateInput): Promise<Consultation> {
    const consultatioUpdate = await prisma.consultation.update({where: {id: id}, data: data});
    return consultatioUpdate;
  }

  // tested
  async delete(id: string): Promise<Consultation> {
    const Consultation = await prisma.consultation.delete({where:{id: id}});
    return Consultation;
  }
}

export default new ConsultationRepository();