import prisma from "@database";
import { Prisma, Patient } from "@prisma/client";

// essa parte serve para isolar o BD (muito legal :)) 
class PatientRepository {
  
  async create(data: Prisma.PatientUncheckedCreateInput): Promise<Patient> {
    return await prisma.patient.create({ data });
  }

  async findAll(): Promise<Patient[]> {
    return await prisma.patient.findMany();
  }

  async findById(id: string): Promise<Patient| null> {
    return await prisma.patient.findUnique({
      where: { id },
    });
  }

  async update(id: string, data: Prisma.PatientUpdateInput): Promise<Patient> {
    return await prisma.patient.update({
      where: { id },
      data,
    });
  }

  async delete(id: string): Promise<Patient> {
    return await prisma.patient.delete({
      where: { id },
    });
  }
}

export default new PatientRepository();