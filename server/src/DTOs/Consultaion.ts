import { z } from 'zod';

export const ConsultationSchema = z.object({
  doctorName: z.string().min(1, "Nome é obrigatório"),
  type: z.string().min(1, "O tipo de consulta é obrigatório"),
  description: z.string().min(1, "A descrição da consulta é obrigatória"),
  datetime: z.coerce.date(), 
});

// TODO: Exportar o UpdateConsultationSchema usando o .partial()
export const UpdateConsultationSchema = ConsultationSchema.partial();