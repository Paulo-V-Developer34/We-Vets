"use server"

import { Operacao } from "../../../generated/prisma"
import prisma from "../prisma"

export async function kpiCaixa() {
	const caixaPositivo = await prisma.fatosFinanceiros.aggregate({
		where: {
			descricao: "Caixa",
			operacao: "CREDITO",
		},
		_sum: {
			valor: true,
		},
	})

	const caixaNegativo = await prisma.fatosFinanceiros.aggregate({
		where: {
			descricao: "Caixa",
			operacao: "DEBITO",
		},
		_sum: {
			valor: true,
		},
	})

	if (caixaNegativo._sum.valor === null || caixaPositivo._sum.valor === null) {
		return 0
	}

	const total =
		caixaPositivo._sum.valor.toNumber() - caixaNegativo._sum.valor.toNumber()
	return total
}

export async function kpiQTDDTransacoes() {
	const transacoes = await prisma.fatosFinanceiros.count()
	if (!transacoes) {
		return 0
	} else {
		return transacoes
	}
}

export async function kpiTotalDebito() {
	const totalDebito = await prisma.fatosFinanceiros.aggregate({
		where: {
			operacao: "DEBITO",
		},
		_sum: {
			valor: true,
		},
	})
	if (!totalDebito._sum.valor) {
		return 0
	} else {
		return totalDebito._sum.valor
	}
}

export async function kpiTotalCredito() {
	const totalCredito = await prisma.fatosFinanceiros.aggregate({
		where: {
			operacao: "CREDITO",
		},
		_sum: {
			valor: true,
		},
	})
	if (!totalCredito._sum.valor) {
		return 0
	} else {
		return totalCredito._sum.valor
	}
}
