import { v4 as uuid } from "uuid";
import { encode as defaultEncode } from "next-auth/jwt";

import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import GitHub from "next-auth/providers/github";
import prisma from "../prisma";
import bcrypt from "bcryptjs";
import { UsuarioSemSenha } from "@/lib/types/userType";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { schema } from "@/lib/types/schema/schema";

//adicionando o adaptador para o Auth.js
const adapter = PrismaAdapter(prisma);

export const { handlers, signIn, signOut, auth } = NextAuth({
	adapter,
	providers: [
		GitHub,
		Credentials({
			credentials: {
				email: { label: "Email", type: "email" },
				password: { label: "Password", type: "password" },
			},
			authorize: async (credentials) => {
				// if (!credentials?.email === undefined || !credentials?.password === undefined) {
				//   throw new Error("Erro na biblioteca de autenticação")
				// }
				const verifiedCredentials = schema.parse(credentials);

				const user = await prisma.user.findUnique({
					where: {
						email: verifiedCredentials.email,
					},
				});

				if (!user) {
					throw new Error("Usuário inválido");
				}

				if (!bcrypt.compareSync(verifiedCredentials.password, user.password)) {
					throw new Error("Senha inválida");
				}

				//filtrando os dados que o programa vai necessitar
				const appUser: UsuarioSemSenha = {
					...user,
				};

				return appUser;
			},
		}),
	],
	callbacks: {
		async jwt({ token, account }) {
			if (account?.provider === "credentials") {
				token.credentials = true;
			}
			return token;
		},
	},
	jwt: {
		encode: async function (params) {
			if (params.token?.credentials) {
				const sessionToken = uuid();

				if (!params.token.sub) {
					throw new Error("No user ID found in token");
				}

				const createdSession = await adapter?.createSession?.({
					sessionToken: sessionToken,
					userId: params.token.sub,
					expires: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
				});

				if (!createdSession) {
					throw new Error("Failed to create session");
				}

				return sessionToken;
			}
			return defaultEncode(params);
		},
	},
});
