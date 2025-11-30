import ChartHeader from "@/components/dashboard/common/Header"
import ChartKpi from "@/components/dashboard/common/Kpis"
import ChartRevenue from "@/components/dashboard/home/RevenueChart"
import ChartService from "@/components/dashboard/home/ServiceChart"
import { getKpi } from "@/lib/charts/kpis"
import { getRevenue } from "@/lib/charts/revenue"
import { getHomeServices } from "@/lib/charts/services"
import { use } from "react"

// --- DADOS MOCKADOS (Para simular o banco de dados) ---

// const dataReceita = [
// 	{ name: "Abr", valor: 4200 },
// 	{ name: "Mai", valor: 5100 },
// 	{ name: "Jun", valor: 4900 },
// 	{ name: "Jul", valor: 6200 },
// 	{ name: "Ago", valor: 7800 },
// 	{ name: "Set", valor: 7400 },
// ]

// const dataAtendimentos = [
// 	{ name: "Consultas", valor: 220 },
// 	{ name: "Vacinação", valor: 140 },
// 	{ name: "Estética", valor: 60 },
// 	{ name: "Cirurgia", valor: 20 },
// 	{ name: "Emergência", valor: 25 },
// 	{ name: "Exames", valor: 75 },
// 	{ name: "Internação", valor: 10 },
// 	{ name: "Retorno", valor: 50 },
// ]

//  {
//  	dataReceita,
//  	dataAtendimentos,
//  	kpi,
//  }: {
//  	dataReceita: Receita[]
//  	dataAtendimentos: Atendimento[]
// 	kpi: Kpi
// }

export default function DashboardPage() {
	const kpi = use(getKpi())
	const revenue = use(getRevenue())
	const service = use(getHomeServices())

	return (
		<div className="space-y-6">
			<ChartHeader
				content={{
					title: "Dashboard",
					text: "Indicadores clínicos, próximos atendimento e controle rápido do estoque",
				}}
			/>
			<ChartKpi kpi={kpi} />
			<div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
				<ChartRevenue dataReceita={revenue} />
				<ChartService dataAtendimentos={service} />
			</div>
		</div>
	)
}
