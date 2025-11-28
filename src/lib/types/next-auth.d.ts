import { Role } from "@prisma/client"
import NextAuth, { DefaultSession, DefaultUser } from "next-auth"
import { JWT } from "next-auth/jwt"
import { DefaultSession } from "next-auth"

declare module "next-auth" {
	interface Session {
		user: {
			role: Role
			name?: string | null
			id: string
		} & DefaultSession["user"]
	}

	interface User {
		id: string
		email: string
		name?: string | null
		role: Role
	}
}

// 2. Ajuste específico para o Adapter (que conecta com o banco)
declare module "@auth/core/adapters" {
	interface AdapterUser {
		// Aqui é onde o erro estava acontecendo.
		// O AdapterUser original espera string, mas o Prisma manda string | null.
		name?: string | null
		email: string
		role: Role // Importante adicionar aqui também
	}
}

declare module "next-auth/jwt" {
	// 3. Permite passar a role para o token JWT
	interface JWT {
		role: Role
	}
}

// 1. Ajuste no Core do Auth.js para aceitar os tipos do Prisma
declare module "@auth/core/types" {
	interface User {
		// Corrige o erro de 'null': diz que o User pode ter name nulo
		name?: string | null
		// Adiciona o campo role para ser reconhecido no objeto User
		role: Role
	}

	interface Session {
		user: {
			role: Role
		} & DefaultSession["user"]
	}
}
