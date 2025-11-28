import z from "zod"

export const ConsultaSchema = z.object({
	diagnostico: z
		.string()
		.min(10, "O diagnóstico deve ser detalhado (mín. 10 caracteres)"),
	observacoes: z.string().optional().nullable(),
	agendamentoId: z.string().uuid("ID do Agendamento inválido"),
	veterinarioId: z.string().uuid("ID do Veterinário inválido"),
})

export type ConsultaForm = z.infer<typeof ConsultaSchema>
