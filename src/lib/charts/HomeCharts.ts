"use server"

import prisma from "../prisma"
import { Atendimento, Kpi, Receita, ChartsHomeType } from "../types/charts"
import { getKpi } from "./kpis"
import { getRevenue } from "./revenue"
import { getHomeServices } from "./services"

export async function getHomeData(): Promise<ChartsHomeType> {
	const [kpi, services, revenue] = await Promise.all([
		getKpi(),
		getHomeServices(),
		getRevenue(),
	])
	return { kpi, services, revenue }
}
