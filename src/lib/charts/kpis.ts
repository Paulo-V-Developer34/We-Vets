"use server"

import prisma from "../prisma"
import { Kpi } from "../types/charts"

export async function getKpi(): Promise<Kpi> {
	const [receita, agendamento, produtos, pets] = await Promise.all([
		getReceita(),
		getAgendamento(),
		getProdutos(),
		getPets(),
	])
	return {
		receita: receita.receita,
		agendamento: agendamento.agendamento,
		produtos: produtos.produtos,
		pets: pets.pets,
	}
}

async function getReceita(): Promise<
	Omit<Kpi, "agendamento" | "produtos" | "pets">
> {
	//calculando a receita
	const [receitas, primeiraData, ultimaData] = await Promise.all([
		prisma.fatosFinanceiros.findMany({
			select: {
				valor: true,
			},
		}),

		prisma.fatosFinanceiros.findFirst({
			orderBy: {
				data: "asc", // ordena do mais antigo para o mais recente
			},
			select: {
				data: true, // retorna apenas o campo "data"
			},
		}),

		// Último registro (maior data)
		prisma.fatosFinanceiros.findFirst({
			orderBy: {
				data: "desc", // ordena do mais recente para o mais antigo
			},
			select: {
				data: true,
			},
		}),
	])

	if (!primeiraData || !ultimaData || !receitas) {
		throw new Error("Não foi possível obter os dados da receita")
	}

	const anoInicial = primeiraData.data.getFullYear()
	const mesInicial = primeiraData.data.getMonth() // Janeiro = 0

	const anoFinal = ultimaData.data.getFullYear()
	const mesFinal = ultimaData.data.getMonth()

	// diferença total em meses
	const diferencaMeses =
		(anoFinal - anoInicial) * 12 + (mesFinal - mesInicial) + 1

	const valorTotal = receitas.reduce((acc, item) => {
		// item.valor pode ser Decimal, então converta
		const valor =
			typeof item.valor === "object" ? Number(item.valor) : item.valor
		return acc + valor
	}, 0)

	const media = valorTotal / diferencaMeses

	return { receita: { media, valorTotal } }
}

async function getAgendamento(): Promise<
	Omit<Kpi, "receita" | "produtos" | "pets">
> {
	const [agendamentosConcluidos, agendamentosAFazer] = await Promise.all([
		prisma.agendamento.count({
			where: {
				status: "CONCLUIDO",
			},
		}),
		prisma.agendamento.count({
			where: {
				status: "PENDENTE",
			},
		}),
	])

	if (!agendamentosAFazer || !agendamentosConcluidos) {
		throw new Error("Não foi possível obter os dados dos agendamentos")
	}

	return {
		agendamento: { aFazer: agendamentosAFazer, feitos: agendamentosConcluidos },
	}
}

async function getProdutos(): Promise<
	Omit<Kpi, "receita" | "agendamento" | "pets">
> {
	const produtos = await prisma.produto.count()
	const produtosFaltando = 3
	if (!produtos || !produtosFaltando) {
		throw new Error("Não foi possível obter os dados dos produtos")
	}

	return { produtos: { estoque: produtos, faltando: produtosFaltando } }
}

async function getPets(): Promise<
	Omit<Kpi, "receita" | "agendamento" | "produtos">
> {
	const [quantidade, ultimoCadastrado] = await Promise.all([
		prisma.pet.count(),
		prisma.pet.findFirst({
			orderBy: {
				cadastro: "desc", // ordena do mais recente para o mais antigo
			},
			select: {
				cadastro: true,
			},
		}),
	])

	if (!quantidade || !ultimoCadastrado) {
		throw new Error("Não foi possível obter os dados dos pets")
	}

	return { pets: { quantidade, ultimoCadastrado: ultimoCadastrado.cadastro } }
}
