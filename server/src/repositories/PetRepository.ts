import prisma from "@database";
import { Prisma } from "@prisma/client";

// essa parte serve para isolar o BD (muito legal :)) 
class PetRepository {
  async create(data: Prisma.PetUncheckedCreateInput) {
    return await prisma.pet.create({ data });
  }

  async findAll() {
    return await prisma.pet.findMany();
  }

  async findById(id: string) {
    return await prisma.pet.findUnique({
      where: { id },
    });
  }

  async update(id: string, data: Prisma.PetUpdateInput) {
    return await prisma.pet.update({
      where: { id },
      data,
    });
  }

  async delete(id: string) {
    return await prisma.pet.delete({
      where: { id },
    });
  }
}

export default new PetRepository();
