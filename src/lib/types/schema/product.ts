import z from "zod"

export const ProdutoSchema = z.object({
	nome: z.string().min(2, "Nome do produto é obrigatório"),
	// coerce.number permite validar inputs type="number" do HTML
	preco: z.coerce.number().min(0, "O preço de custo deve ser positivo"),
	estoque: z.coerce.number().int().min(0, "O estoque não pode ser negativo"),
	fatoId: z.string().uuid().optional().nullable(), // Quem cadastrou
})

export type ProdutoForm = z.infer<typeof ProdutoSchema>
