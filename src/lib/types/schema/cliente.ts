import z, { string } from "zod"
import { DonoSchema } from "./owner"
import { UserSchema } from "./user"
import { Dono, User } from "../../../../generated/prisma"

export const clienteSchema = UserSchema.extend(DonoSchema.shape)
export type ClienteSchema = z.infer<typeof clienteSchema>
export type ClienteSchemaWithID = ClienteSchema & {
	id: string
}
export type ClienteUser = User & { dono: Dono | null }
