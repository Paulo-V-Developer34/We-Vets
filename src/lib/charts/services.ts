"use server"

import prisma from "../prisma"
import { Atendimento } from "../types/charts"

export async function getHomeServices(): Promise<Atendimento[]> {
	const servicos = await prisma.consulta.groupBy({
		by: ["tipo"],
		_count: {
			tipo: true,
		},
	})

	const grupoServicos = servicos.map((el, i) => {
		return { name: el.tipo, valor: el._count.tipo }
	})

	// { diet: 12, "sem gluten": 7, "sem lactose": 5 }

	return grupoServicos
}
