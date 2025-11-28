import z from "zod"
import { Role } from "../../../../generated/prisma"

export const RoleSchema = z.nativeEnum(Role)

export const UserSchema = z.object({
	name: z
		.string()
		.min(2, "O nome deve ter pelo menos 2 caracteres")
		.optional()
		.nullable(),
	email: z.string().email("Insira um e-mail válido"),
	password: z
		.string()
		.min(6, "A senha deve ter no mínimo 6 caracteres")
		.optional(),
	role: RoleSchema.default(Role.USER),
})

export const login = z.object({
	email: z.email(),
	password: z.string().min(8),
})

export type UserForm = z.infer<typeof UserSchema>
