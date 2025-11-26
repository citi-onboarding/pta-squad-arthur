import { z } from 'zod';

export const ConsultationSchema = z.object({

  doctorName: z
  .string({error: "O nome deve ser uma string"})
  .nonempty({ message: "O nome é obrigatório, por favor informe-o."}),

  description: z
  .string({error: "A descrição deve ser uma string"})
  .nonempty({ message: "A descrição da consulta é obrigatória."}),

  type: z
  .string({error: "O tipo da consulta deve ser uma string"})
  .nonempty({message: "Por favor, informe o tipo de consulta."}),

  datetime: z
  .coerce.date(),


  patientId: z
  .string()
  .uuid(),
});

// TODO: Exportar o UpdateConsultationSchema usando o .partial()
export const UpdateConsultationSchema = ConsultationSchema.partial();