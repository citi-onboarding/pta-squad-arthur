import { z } from 'zod';

export const User = z.object({
    firstName: z
    .string({ error: 'O primeiro nome deve ser uma string' })
    .nonempty({ message: 'O primeiro nome é obrigatório' }),
    lastName: z
    .string({ error: 'O sobrenome deve ser uma string' })
    .nonempty({ message: 'O sobrenome é obrigatório' }),
    age: z
    .number({ error: 'A idade deve ser um number' })
    .nonoptional({ message: 'A idade é obrigatória' }),
});

export const UpdateUser = User.partial();