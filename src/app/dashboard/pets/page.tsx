import ChartHeader from "@/components/dashboard/common/Header"
import ChartKpi from "@/components/dashboard/common/Kpis"
import { ClientTable } from "@/components/dashboard/clientes/Table"
import { KpiCommon } from "@/lib/types/charts"
import { Client, KpiClient } from "@/lib/types/client"
import { use } from "react"
import { clientRead } from "@/lib/model/client"

export default function DashboardPage() {
	throw new Error("Página em manutenção")
	const usersData = use(clientRead())

	const kpis: KpiClient = {
		totalClients: 1550,
		activeClients: 1240,
		newClients: 45,
		churnRate: 2.4,
	}

	const kpi: KpiCommon[] = [
		{
			title: "Total de Clientes",
			value: kpis.totalClients.toString(),
		},
		{
			title: "Pets Ativos",
			value: kpis.totalClients.toString(),
		},
		{
			title: "Último cadastro",
			value: kpis.newClients.toString(),
		},
	]

	return (
		<div className="space-y-6">
			{/* Header alinhado sem padding extra */}
			<ChartHeader
				content={{
					title: "Gestão de Pets",
					text: "Gerencie os pets cadastrados.",
				}}
			/>

			{/* KPIs expandindo para ocupar a largura disponível do container pai */}
			<ChartKpi kpi={kpi} />

			{/* Tabela ocupando a largura total */}
			<ClientTable initialData={usersData} />
		</div>
	)
}
