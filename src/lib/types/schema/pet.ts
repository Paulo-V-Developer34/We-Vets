import z from "zod"

export const PetSchema = z.object({
	nome: z.string().min(1, "O nome do pet é obrigatório"),
	especie: z.string().min(1, "A espécie é obrigatória (ex: Cachorro, Gato)"),
	raca: z.string().optional().nullable(),
	// z.coerce converte string "2023-01-01" para Date automaticamente
	nascimento: z.coerce
		.date()
		.max(new Date(), "A data de nascimento não pode ser no futuro")
		.optional()
		.nullable(),
})

export type PetForm = z.infer<typeof PetSchema>
