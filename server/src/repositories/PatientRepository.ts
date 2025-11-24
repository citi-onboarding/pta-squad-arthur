import prisma from "@database";
import { Prisma } from "@prisma/client";

// essa parte serve para isolar o BD (muito legal :)) 
class PatientRepository {
  
  // Agora usamos PatientUncheckedCreateInput
  async create(data: Prisma.PatientUncheckedCreateInput) {
    return await prisma.patient.create({ data });
  }

  async findAll() {
    return await prisma.patient.findMany();
  }

  async findById(id: string) {
    return await prisma.patient.findUnique({
      where: { id },
    });
  }

  // Agora usamos PatientUpdateInput
  async update(id: string, data: Prisma.PatientUpdateInput) {
    return await prisma.patient.update({
      where: { id },
      data,
    });
  }

  async delete(id: string) {
    return await prisma.patient.delete({
      where: { id },
    });
  }
}

export default new PatientRepository();