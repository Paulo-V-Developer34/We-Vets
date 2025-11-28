import z from "zod"

export const VeterinarioSchema = z.object({
	crmv: z.string().min(4, "CRMV é obrigatório"),
	especialidade: z.string().min(3, "Especialidade é obrigatória"),
	// userId geralmente vem da sessão, não do form, mas deixamos opcional para validação
	userId: z.string().uuid().optional(),
})

export type VeterinarioForm = z.infer<typeof VeterinarioSchema>
