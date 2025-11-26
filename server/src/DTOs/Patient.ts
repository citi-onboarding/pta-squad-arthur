import { z } from "zod";

// Aqui garante que nenhum dado lixo ou mal formado chegue ao controlador ou bd. O zod faz isso praticamente só
// zod.object define que espera um objeto JSON (chave valor)
// a mensagem será enviada ao front, caso haja erro
export const PatientSchema = z.object({
  name: z.string().min(1, "O nome do pet é obrigatório"),
  tutorName: z.string().min(1, "O nome do tutor é obrigatório"),
  age: z.number().int().min(0, "A idade deve ser um número inteiro positivo"),
  species: z.string().min(1, "A espécie é obrigatória"),
});

// o partial é muito bom, pois permite que voce atualize apenas o que quiser.
// Se usássemos apenas o PatientSchema no update, teríamos que enviar todos os campos obrigatórios novamente.
// Doc: https://zod.dev/api?id=partial
export const UpdatePatientSchema = PatientSchema.partial();