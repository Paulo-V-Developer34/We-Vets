import { User } from "../../../generated/prisma"

export type UsuarioSemSenha = Omit<User,'password'>