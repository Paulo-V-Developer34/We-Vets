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

export async function productCreat(
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

		const produtoValido = ProdutoSchema.parse(produto)

		const fato = {
			descricao: descricao,
			tipoPatrimonial: formData.get("heritageType") as string | null,
			tipoResultado: formData.get("resultType") as string | null,
			valor: produtoValido.estoque * produtoValido.preco,
		}

		const fatoValido = FatosFinanceirosSchema.parse(fato)
		const otherClass: ClassPatrimonio =
			fatoValido.tipoPatrimonial === ClassPatrimonio.ATIVO_CIRCULANTE
				? ClassPatrimonio.PASSIVO_CIRCULANTE
				: ClassPatrimonio.PASSIVO_EXIGIVEL
		//criando usuário
		const produtoCadastrado = await prisma.produto.create({
			data: {
				estoque: produtoValido.estoque,
				nome: produtoValido.nome,
				preco: produtoValido.preco,
				fatos: {
					createMany: {
						data: [
							{
								descricao: fatoValido.descricao,
								valor: fatoValido.valor,
								tipoPatrimonial: fatoValido.tipoPatrimonial,
								tipoResultado: fatoValido.tipoResultado,
							},
							{
								descricao: fatoValido.descricao,
								valor: fatoValido.valor,
								tipoPatrimonial: otherClass,
								tipoResultado: fatoValido.tipoResultado,
							},
						],
					},
				},
			},
		})

		if (!produtoCadastrado) {
			throw new Error("Não foi possível criar o cliente")
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
		message: "Cliente criado com sucesso",
		timestamp: Date.now(),
	}
}

export async function productRead(): Promise<ProductWithID[]> {
	//code
	const produtos = await prisma.produto.findMany({
		include: {
			fatos: {
				select: {
					id: true,
					tipoPatrimonial: true,
					tipoResultado: true,
				},
			},
		},
	})

	if (!produtos) {
		throw new Error("Não foi possível obter os dados dos produtos")
	}

	// produtos[0].fatos[0].

	const produtosComFatos = produtos.filter((el) => el.fatos[0])

	const produtoConvertido: ProductWithID[] = produtosComFatos.map((el) => {
		const precoConvertido = el.preco.toNumber()

		const produto: ProductWithID = {
			estoque: el.estoque,
			id: el.id,
			nome: el.nome,
			preco: precoConvertido,
			tipoPatrimonial: el.fatos[0].tipoPatrimonial,
			tipoResultado: el.fatos[0].tipoResultado,
			veterinarioId: el.veterinarioId,
		}

		return produto
	})

	return produtoConvertido
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

export async function productDelete(id: string): Promise<FormMessage> {
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

	const userDeletado = await prisma.produto.delete({
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

	revalidatePath("/dashboard/estoque")

	return {
		message: "Usuário deletado com sucesso",
		timestamp: Date.now(),
	}
}
