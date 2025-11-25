import { z } from 'zod';

export const ConsultationSchema = z.object({

  doctorName: z
  .string({error: "O nome deve ser uma string"})
  .nonempty({ message: "O nome é obrigatório, por favor informe-o."})
  .regex(/^[a-zA-Z\s'áàãâéèêíìóòõôúùçÁÀÃÂÉÈÊÍÌÓÒÕÔÚÙÇ]+$/, {message: "O nome contém caracters inválidos"}),

  description: z
  .string({error: "A descrição deve ser uma string"})
  .nonempty({ message: "A descrição da consulta é obrigatória."}),

  type: z
  .string({error: "O tipo da consulta deve ser uma string"})
  .nonempty({message: "Por favor, informe o tipo de consulta."})
  .regex(/^[a-zA-Z\s'áàãâéèêíìóòõôúùçÁÀÃÂÉÈÊÍÌÓÒÕÔÚÙÇ]+$/, {message: "O tipo deconsulta contém caracters inválidos, por favor revise-o"}),

  datetime: z
  .coerce.date(),


  patientId: z
  .string()
  .uuid(),
});

// TODO: Exportar o UpdateConsultationSchema usando o .partial()
export const UpdateConsultationSchema = ConsultationSchema.partial();