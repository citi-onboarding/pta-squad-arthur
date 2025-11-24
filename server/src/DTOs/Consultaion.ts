import { z } from 'zod';

export const ConsultationSchema = z.object({
  doctorName: z.string().min(1, "Nome é obrigatório"),
  description: z.string().min(1, "A descrição da consulta é obrigatória"),
  type: z.string().min(1, "O tipo de consulta é obrigatório"),
  datetime: z.coerce.date(),
  patientId: z.string().uuid(),
});

// TODO: Exportar o UpdateConsultationSchema usando o .partial()
export const UpdateConsultationSchema = ConsultationSchema.partial();