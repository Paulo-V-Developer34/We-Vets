"use server"

import { PrismaClientKnownRequestError } from "../../../generated/prisma/runtime/library"
import prisma from "../prisma"
import { FormMessage } from "../types/message"

export async function deletarBanco(): Promise<FormMessage> {
	try {
		await prisma.fatosFinanceiros.deleteMany()
		await prisma.consulta.deleteMany()
		await prisma.agendamento.deleteMany()
		await prisma.despesas.deleteMany()
		await prisma.produto.deleteMany()
		await prisma.pertence.deleteMany()
		await prisma.pet.deleteMany()
		await prisma.dono.deleteMany()
	} catch (error) {
		if (error instanceof PrismaClientKnownRequestError) {
			return {
				message: "Erro ao deletar banco",
				timestamp: Date.now(),
				errors: {
					err: [`Erro no banco de dados: ${error.message}`],
				},
			}
		}
		return {
			message: "Erro ao deletar banco",
			timestamp: Date.now(),
			errors: {
				err: ["Erro desconhecido"],
			},
		}
	}

	return {
		message: "Usuário deletado com sucesso",
		timestamp: Date.now(),
	}
}
