import ChartHeader from "@/components/dashboard/common/Header"
import ChartKpi from "@/components/dashboard/common/Kpis"
import { ClientTable } from "@/components/dashboard/clientes/Table"
import { KpiCommon } from "@/lib/types/charts"
import { Client, KpiClient } from "@/lib/types/client"
import { use } from "react"
import { clientRead } from "@/lib/model/client"
import { productRead } from "@/lib/model/product"
import { ProductTable } from "@/components/dashboard/estoque/Table"

export default function DashboardPage() {
	const usersData = use(productRead())

	const kpis: KpiClient = {
		totalClients: 1550,
		activeClients: 1240,
		newClients: 45,
		churnRate: 2.4,
	}

	const kpi: KpiCommon[] = [
		{
			title: "Total de Produtos",
			value: kpis.newClients.toString(),
		},
		{
			title: "Melhor produto",
			value: "Ração golden",
		},
		{
			title: "Última atualização",
			value: new Date().toDateString(),
		},
	]

	return (
		<div className="space-y-6">
			{/* Header alinhado sem padding extra */}
			<ChartHeader
				content={{
					title: "Gestão de Produtos",
					text: "Gerencie os produtos e medicamentos da clínica.",
				}}
			/>

			{/* KPIs expandindo para ocupar a largura disponível do container pai */}
			<ChartKpi kpi={kpi} />

			{/* Tabela ocupando a largura total */}
			<ProductTable initialData={usersData} />
		</div>
	)
}
