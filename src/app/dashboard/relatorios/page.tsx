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
			title: "Total de Caixa",
			value: kpis.totalClients.toString(),
		},
		{
			title: "Transações",
			value: kpis.activeClients.toString(),
		},
		{
			title: "Receita Mensal",
			value: kpis.newClients.toString(),
		},
	]

	return (
		<div className="space-y-6">
			{/* Header alinhado sem padding extra */}
			<ChartHeader
				content={{
					title: "Diário Contábil",
					text: "Gerencie os fatos ocorridos e seu caixa disponível.",
				}}
			/>

			{/* KPIs expandindo para ocupar a largura disponível do container pai */}
			<ChartKpi kpi={kpi} />

			{/* Tabela ocupando a largura total */}
			<ProductTable initialData={usersData} />
		</div>
	)
}
