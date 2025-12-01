import z, { string } from "zod"
import { DonoSchema } from "./owner"
import { UserSchema } from "./user"

export const clienteSchema = UserSchema.extend(DonoSchema.shape)
export type ClienteSchema = z.infer<typeof clienteSchema>
export type ClienteSchemaWithID = ClienteSchema & {
	id: string
}
