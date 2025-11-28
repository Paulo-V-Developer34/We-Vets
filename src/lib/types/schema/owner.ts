import z from "zod"

export const DonoSchema = z.object({
	telefone: z
		.string()
		.min(10, "Telefone inválido (mínimo 10 dígitos)")
		.regex(/^\+?[0-9\s-]*$/, "Telefone deve conter apenas números ou traços")
		.optional()
		.nullable(),
	endereco: z.string().optional().nullable(),
	userId: z.string().uuid().optional(),
})

export type DonoForm = z.infer<typeof DonoSchema>
