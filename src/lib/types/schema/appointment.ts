import z from "zod"

export const AgendamentoSchema = z.object({
	datahora: z.coerce.date().refine((date) => date > new Date(), {
		message: "O agendamento deve ser para uma data futura",
	}),
	status: z.enum(["PENDENTE", "CONCLUIDO", "CANCELADO"]).default("PENDENTE"),
	donoId: z.string().uuid("Dono obrigatório"),
	petId: z.string().uuid("Pet obrigatório"),
})

export type AgendamentoForm = z.infer<typeof AgendamentoSchema>
