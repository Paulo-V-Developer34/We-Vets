import prisma from "../prisma"
import { subMonths } from "date-fns"
import { Receita } from "../types/charts"

export async function getRevenue(): Promise<Receita[]> {
	const dataLimite: Date = subMonths(new Date(), 6)

	// 	const fatos = await prisma.$queryRaw<
	// 		{ ano: number; mes: number; total_custo: number }[] | null
	// 	>`
	//     SELECT
	//       EXTRACT(YEAR FROM "data") AS ano,
	//       EXTRACT(MONTH FROM "data") AS mes,
	//       SUM("custo") AS total_custo
	//     FROM "FatosFinanceiros"
	//     WHERE "data" >= ${dataLimite}
	//     GROUP BY ano, mes
	//     ORDER BY ano, mes;
	//   `
	const fatos: Receita[] = [
		{ name: "janeiro", valor: 1000 },
		{ name: "fevereiro", valor: 1500 },
		{ name: "março", valor: 2000 },
		{ name: "abril", valor: 500 },
		{ name: "maio", valor: 1500 },
		{ name: "junho", valor: 800 },
	]

	// if (!fatos) {
	// 	throw new Error("Não foi possível obter os dados do faturamento")
	// }

	// const receita: Receita[] = fatos.map((el, i) => {
	// 	return { name: el.mes.toString(), valor: el.total_custo }
	// })

	return fatos
}
