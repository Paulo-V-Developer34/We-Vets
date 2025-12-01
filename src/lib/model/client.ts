"use server"

import z, { ZodError } from "zod"
import { Dono, User } from "../../../generated/prisma"
import prisma from "../prisma"
import { FormMessage } from "../types/message"
import { DonoSchema } from "../types/schema/owner"
import { UserSchema } from "../types/schema/user"
import { revalidatePath } from "next/cache"
import { clienteSchema, ClienteUser } from "../types/schema/cliente"
import { genSaltSync, hashSync } from "bcryptjs"

export async function clientCreat(
	prevState: FormMessage,
	formData: FormData,
): Promise<FormMessage> {
	//verificando o usuário

	const senha = formData.get("password") as string | null
	// Configuração de senha

	if (!senha) {
		return {
			message: "Um erro ocorreu",
			errors: {
				err: ["Não foi possível obter a senha"],
			},
			timestamp: Date.now(),
		}
	}
	const salt = genSaltSync(10)
	const hash = hashSync(senha, salt)

	const cliente = {
		email: formData.get("email") as string | null,
		role: "DONO",
		name: formData.get("name") as string | null,
		password: senha,
		endereco: formData.get("address") as string | null,
		telefone: formData.get("phone") as string | null,
		image: formData.get("image") as string | null,
	}

	try {
		const clienteValido = clienteSchema.parse(cliente)

		//criando usuário
		const user = await prisma.user.create({
			data: {
				email: clienteValido.email,
				image: clienteValido.image,
				name: clienteValido.name,
				password: hash,
				role: clienteValido.role,
				dono: {
					create: {
						endereco: clienteValido.endereco,
						telefone: clienteValido.telefone,
					},
				},
			},
		})

		if (!user) {
			throw new Error("Não foi possível criar o cliente")
		}
		revalidatePath("/dashboard/clientes")
	} catch (error) {
		if (error instanceof ZodError) {
			return {
				message: "Um erro ocorreu",
				errors: {
					err: [error.issues[0].message],
				},
				timestamp: Date.now(),
			}
		}

		return {
			message: "Um erro ocorreu",
			errors: {
				err: ["Erro no servidor"],
			},
			timestamp: Date.now(),
		}
	}

	return {
		message: "Cliente criado com sucesso",
		timestamp: Date.now(),
	}
}

export async function clientRead(): Promise<ClienteUser[]> {
	//code
	const clientes = await prisma.user.findMany({
		include: {
			dono: true,
		},
		where: {
			dono: {
				isNot: null,
			},
		},
	})

	if (!clientes) {
		throw new Error("Não foi possível obter os dados dos clientes")
	}

	return clientes
}

export async function clientReadOne(
	prevState: FormMessage,
	formData: FormData,
): Promise<ClienteUser> {
	//code
	const id = formData.get("id") as string | null

	if (!id) {
		throw new Error("Não foi possível obter o id do cliente")
	}

	const cliente = await prisma.user.findUnique({
		where: {
			id: id,
			dono: {
				isNot: null,
			},
		},
		include: {
			dono: true,
		},
	})

	if (!cliente) {
		throw new Error("Não foi possível obter os dados dos cliente")
	}

	return cliente
}

export async function clientUpdate(
	prevState: FormMessage,
	formData: FormData,
): Promise<FormMessage> {
	//verificando o usuário
	const clienteSchema = UserSchema.extend(DonoSchema.shape)
	type ClienteSchema = z.infer<typeof clienteSchema>

	const senha = formData.get("password") as string | null

	if (!senha) {
		return {
			message: "Um erro ocorreu",
			errors: {
				err: ["Senha não informada"],
			},
			timestamp: Date.now(),
		}
	}

	const salt = genSaltSync(10)
	const hash = hashSync(senha, salt)

	const cliente = {
		email: formData.get("email") as string | null,
		role: "DONO",
		name: formData.get("name") as string | null,
		password: hash,
		endereco: formData.get("address") as string | null,
		telefone: formData.get("phone") as string | null,
		image: formData.get("image") as string | null,
	}

	const userID = formData.get("id") as string | null

	try {
		if (!userID) {
			throw new Error("Não foi possível obter o ID do usuário")
		}

		const clienteValido = clienteSchema.parse(cliente)

		//criando usuário
		const user = await prisma.user.update({
			where: {
				id: userID,
			},
			data: {
				email: clienteValido.email,
				image: clienteValido.image,
				name: clienteValido.name,
				password: hash,
				role: clienteValido.role,
				dono: {
					update: {
						endereco: clienteValido.endereco,
						telefone: clienteValido.telefone,
					},
				},
			},
		})

		if (!user) {
			throw new Error("Não foi possível atualizar o cliente")
		}

		revalidatePath("/dashboard/clientes")
	} catch (error) {
		if (error instanceof ZodError) {
			return {
				message: "Um erro ocorreu",
				errors: {
					err: [error.issues[0].message],
				},
				timestamp: Date.now(),
			}
		}

		return {
			message: "Um erro ocorreu",
			errors: {
				err: ["Erro no servidor"],
			},
			timestamp: Date.now(),
		}
	}

	return {
		message: "hello world",
		timestamp: Date.now(),
	}
}

export async function clientDelete(id: string): Promise<FormMessage> {
	const userID = id
	if (!userID) {
		return {
			message: "Um erro ocorreu",
			errors: {
				err: ["Não foi possível obter o ID do usuário"],
			},
			timestamp: Date.now(),
		}
	}

	const userDeletado = await prisma.user.delete({
		where: {
			id: userID,
		},
		include: {
			dono: true,
		},
	})

	if (!userDeletado) {
		return {
			message: "Um erro ocorreu",
			errors: {
				err: ["Não foi possível deletar o usuário"],
			},
			timestamp: Date.now(),
		}
	}

	revalidatePath("/dashboard/clientes")

	return {
		message: "Usuário deletado com sucesso",
		timestamp: Date.now(),
	}
}
