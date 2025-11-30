import { z } from "zod"

export const clientFormSchema = z.object({
	name: z
		.string()
		.min(2, { message: "O nome deve ter pelo menos 2 caracteres." }),
	email: z.string().email({ message: "Insira um e-mail válido." }),
	status: z.enum(["Ativo", "Inativo", "Pendente"]),
	ltv: z.coerce.number().min(0, { message: "O valor deve ser positivo." }),
})

export type ClientFormValues = z.infer<typeof clientFormSchema>
