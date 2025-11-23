import prisma from "@database";
import { Prisma } from "@prisma/client";

class ConsultationRepository {

  async create(data: Prisma.ConsultationUncheckedCreateInput) {
    return await prisma.consultation.create({data: data}) 
    
  }

  async findAll() {
    return await prisma.consultation.findMany()
  }

  async findById(id: string) {
    return await prisma.consultation.findUnique({where: {id: id}})
  }

  async update(id: string, data: Prisma.ConsultationUpdateInput) {
    return await prisma.consultation.update({where: {id: id}, data: data})
  }

  async delete(id: string) {
    return await prisma.consultation.delete({where:{id: id}})
  }
}

export default new ConsultationRepository();