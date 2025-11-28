import z from "zod"

export const PertenceSchema = z.object({
	donoId: z.string().uuid("ID do Dono inválido"),
	petId: z.string().uuid("ID do Pet inválido"),
	ativo: z.boolean().default(true),
})

export type PertenceForm = z.infer<typeof PertenceSchema>
