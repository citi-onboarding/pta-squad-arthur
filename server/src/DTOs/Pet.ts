import { z } from "zod";

export const PetSchema = z.object({
  name: z.string().min(1, "O nome do Pet é obrigatório"),
  tutorName: z.string().min(1, "O nome do tutor é obrigatório"),
  age: z.number().int().min(0, "A idade deve ser um número inteiro positivo"),
  species: z.string().min(1, "A espécie é obrigatória"),
});

export const UpdatePetSchema = PetSchema.partial();
