import z from "zod"

export const FatosFinanceirosSchema = z
	.object({
		tipo: z.enum(["RECEITA", "DESPESA"]),
		valor: z.coerce.number().positive("O valor deve ser positivo"),
		descricao: z.string().min(3, "Descrição necessária"),
		data: z.coerce.date().default(() => new Date()),
		// Opcionais pois depende da origem
		agendamentoId: z.string().uuid().optional().nullable(),
		produtoId: z.string().uuid().optional().nullable(),
	})
	.refine((data) => data.agendamentoId || data.produtoId || data.descricao, {
		message:
			"O fato financeiro deve estar vinculado a algo ou ter uma descrição clara",
	})

export type FatosForm = z.infer<typeof FatosFinanceirosSchema>
