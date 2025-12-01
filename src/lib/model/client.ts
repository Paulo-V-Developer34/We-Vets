"use server"

import z from "zod"
import { Dono } from "../../../generated/prisma"
import prisma from "../prisma"
import { FormMessage } from "../types/message"
import { DonoSchema } from "../types/schema/owner"
import { UserSchema } from "../types/schema/user"
import { revalidatePath } from "next/cache"
import { clienteSchema } from "../types/schema/cliente"
import { genSaltSync, hashSync } from "bcryptjs"

export async function clientCreat(
	prevState: FormMessage,
	formData: FormData,
): Promise<FormMessage> {
	//verificando o usuário

	const cliente = {
		email: formData.get("email") as string | null,
		role: "DONO",
		name: formData.get("name") as string | null,
		password: formData.get("password") as string | null,
		endereco: formData.get("address") as string | null,
		telefone: formData.get("phone") as string | null,
		image: formData.get("image") as string | null,
	}

	try {
		const clienteValido = clienteSchema.parse(cliente)

		//criando usuário
		const user = await prisma.user.create({
			data: {
				...clienteValido,
			},
		})

		if (!user) {
			throw new Error("Não foi possível criar o cliente")
		}
		revalidatePath("/dashboard/clientes")
	} catch (error) {
		return {
			message: "Um erro ocorreu",
			errors: {
				err: error as string[],
			},
			timestamp: Date.now(),
		}
	}

	return {
		message: "Cliente criado com sucesso",
		timestamp: Date.now(),
	}
}

export async function clientRead(): Promise<Dono[]> {
	//code
	const clientes = await prisma.dono.findMany()

	if (!clientes) {
		throw new Error("Não foi possível obter os dados dos clientes")
	}

	return clientes
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
				...clienteValido,
			},
		})

		if (!user) {
			throw new Error("Não foi possível atualizar o cliente")
		}

		revalidatePath("/dashboard/clientes")
	} catch (error) {
		return {
			message: "Um erro ocorreu",
			errors: {
				err: error as string[],
			},
			timestamp: Date.now(),
		}
	}

	return {
		message: "hello world",
		timestamp: Date.now(),
	}
}

export async function clientDelete(
	prevState: FormMessage,
	formData: FormData,
): Promise<FormMessage> {
	const userID = formData.get("id") as string | null
	if (!userID) {
		return {
			message: "Um erro ocorreu",
			errors: {
				err: ["Não foi possível obter o ID do usuário"],
			},
			timestamp: Date.now(),
		}
	}

	const userDeletado = prisma.user.delete({
		where: {
			id: userID,
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

	return {
		message: "Usuário deletado com sucesso",
		timestamp: Date.now(),
	}
}
