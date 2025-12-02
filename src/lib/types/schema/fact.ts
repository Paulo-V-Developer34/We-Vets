import z from "zod"
import { ClassPatrimonio, ClassResultado } from "../../../../generated/prisma"

export const FatosFinanceirosSchema = z
	.object({
		tipoPatrimonial: z.enum([
			ClassPatrimonio.ATIVO_CIRCULANTE,
			ClassPatrimonio.ATIVO_NAO_CIRCULANTE,
			ClassPatrimonio.ATIVO_PERMANENTE,
			ClassPatrimonio.PASSIVO_CIRCULANTE,
			ClassPatrimonio.PASSIVO_EXIGIVEL,
			ClassPatrimonio.PATRIMONIO_LIQUIDO,
		]),
		tipoResultado: z.enum([
			ClassResultado.DESPESAS_NAO_OPERACIONAIS,
			ClassResultado.DESPESAS_OPERACIONAIS,
			ClassResultado.RECEITAS_NAO_OPERACIONAIS,
			ClassResultado.RECEITAS_OPERACIONAIS,
		]),
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
