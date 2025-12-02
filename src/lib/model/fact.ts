"use server"

import z, { ZodError } from "zod"
import {
	ClassPatrimonio,
	Dono,
	FatosFinanceiros,
	Produto,
	User,
} from "../../../generated/prisma"
import prisma from "../prisma"
import { FormMessage } from "../types/message"
import { DonoSchema } from "../types/schema/owner"
import { UserSchema } from "../types/schema/user"
import { revalidatePath } from "next/cache"
import { clienteSchema, ClienteUser } from "../types/schema/cliente"
import { genSaltSync, hashSync } from "bcryptjs"
import { Decimal } from "../../../generated/prisma/runtime/library"
import { ProdutoSchema } from "../types/schema/product"
import { FatosFinanceirosSchema, FatosForm } from "../types/schema/fact"
import { ProductWithID } from "../types/product"
import { FactWithoutDecimal } from "../types/fact"

export async function factCreat(
	prevState: FormMessage,
	formData: FormData,
): Promise<FormMessage> {
	//verificando o usuário
	try {
		const fact = {
			data: formData.get("date"),
			descricao: formData.get("description"),
			valor: formData.get("price"),
			parcelas: formData.get("parcela"),
			tipoPatrimonial: formData.get("heritageType"),
			tipoResultado: formData.get("resultType"),
		}

		const factValido = FatosFinanceirosSchema.parse(fact)

		//criando usuário
		const produtoCadastrado = await prisma.fatosFinanceiros.create({
			data: {
				...factValido,
			},
		})

		if (!produtoCadastrado) {
			throw new Error("Não foi possível criar o cliente")
		}
		revalidatePath("/dashboard/relatorios")
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

export async function factRead(): Promise<FactWithoutDecimal[]> {
	//code
	const fact = await prisma.fatosFinanceiros.findMany()

	if (!fact) {
		throw new Error("Não foi possível obter os dados dos produtos")
	}

	const factConvertido: FactWithoutDecimal[] = fact.map((el) => {
		const precoConvertido = el.valor.toNumber()

		const produto: FactWithoutDecimal = {
			data: el.data,
			descricao: el.descricao,
			id: el.id,
			parcelas: el.parcelas,
			tipoPatrimonial: el.tipoPatrimonial,
			tipoResultado: el.tipoResultado,
			valor: precoConvertido,
			agendamentoId: el.agendamentoId,
			produtoId: el.produtoId,
		}

		return produto
	})

	return factConvertido
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

export async function productUpdate(
	prevState: FormMessage,
	formData: FormData,
): Promise<FormMessage> {
	//verificando o usuário

	const preco = formData.get("price") as string | null
	const descricao = formData.get("description") as string | null
	// Configuração de preco
	// p
	if (!preco || !descricao) {
		return {
			message: "Um erro ocorreu",
			errors: {
				err: ["Não foi possível obter os dados do formulário"],
			},
			timestamp: Date.now(),
		}
	}

	try {
		const produto = {
			nome: formData.get("name") as string | null,
			preco: new Decimal(preco),
			estoque: formData.get("stock") as number | null,
			veterinarioId: formData.get("id") as string | null,
		}

		const id = formData.get("id") as string | null
		const factId = formData.get("factId") as string

		if (!id || factId === "") {
			throw new Error("id não informado")
		}

		const produtoValido = ProdutoSchema.parse(produto)

		const fato = {
			descricao: descricao,
			tipoPatrimonial: formData.get("heritageType") as string | null,
			tipoResultado: formData.get("resultType") as string | null,
			valor: produtoValido.estoque * produtoValido.preco,
		}

		const fatoValido = FatosFinanceirosSchema.parse(fato)

		//criando usuário
		const product = await prisma.produto.update({
			where: {
				id: id,
			},
			data: {
				...produtoValido,
				fatos: {
					update: {
						where: {
							id: factId,
						},
						data: {
							descricao: fatoValido.descricao,
							tipoPatrimonial: fatoValido.tipoPatrimonial,
							tipoResultado: fatoValido.tipoResultado,
							valor: fatoValido.valor,
						},
					},
				},
			},
		})

		if (!product) {
			throw new Error("Não foi possível atualizar o Produto")
		}

		revalidatePath("/dashboard/estoque")
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
		message: "Produto atualizado com sucesso",
		timestamp: Date.now(),
	}
}

export async function factDelete(id: string): Promise<FormMessage> {
	const productID = id
	if (!productID) {
		return {
			message: "Um erro ocorreu",
			errors: {
				err: ["Não foi possível obter o ID do usuário"],
			},
			timestamp: Date.now(),
		}
	}

	const userDeletado = await prisma.fatosFinanceiros.delete({
		where: {
			id: productID,
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

	revalidatePath("/dashboard/relatorios")

	return {
		message: "Usuário deletado com sucesso",
		timestamp: Date.now(),
	}
}
