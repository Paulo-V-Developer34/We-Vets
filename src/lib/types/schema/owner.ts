import z from "zod"

export const DonoSchema = z.object({
	telefone: z
		.string()
		.min(10, "Telefone inválido (mínimo 10 dígitos)")
		.regex(
			/^\(?(\d{2})\)?\s?\d{4,5}-?\d{4}$/,
			"Telefone deve conter apenas números ou traços",
		)
		.optional()
		.nullable(),
	endereco: z.string().optional().nullable(),
	userId: z.uuid().optional(),
})

export type DonoForm = z.infer<typeof DonoSchema>
