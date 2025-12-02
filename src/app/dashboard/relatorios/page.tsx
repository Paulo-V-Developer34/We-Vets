import ChartHeader from "@/components/dashboard/common/Header"
import ChartKpi from "@/components/dashboard/common/Kpis"
import { ClientTable } from "@/components/dashboard/clientes/Table"
import { KpiCommon } from "@/lib/types/charts"
import { Client, KpiClient } from "@/lib/types/client"
import { use } from "react"
import { clientRead } from "@/lib/model/client"
import { productRead } from "@/lib/model/product"
import { ProductTable } from "@/components/dashboard/estoque/Table"
import { factRead } from "@/lib/model/fact"
import { FactTable } from "@/components/dashboard/relatorios/Table"
import {
	kpiCaixa,
	kpiQTDDTransacoes,
	kpiTotalCredito,
	kpiTotalDebito,
} from "@/lib/kpis/relatorioKpi"
import { getReceita } from "@/lib/charts/kpis"

export default function DashboardPage() {
	const usersData = use(factRead())

	// const kpis: KpiClient = {
	// 	totalClients: 1550,
	// 	activeClients: 1240,
	// 	newClients: 45,
	// 	churnRate: 2.4,
	// }

	const kpi: KpiCommon[] = [
		{
			title: "Total de Caixa",
			value: use(kpiCaixa()).toString(),
		},
		{
			title: "Transações",
			value: use(kpiQTDDTransacoes()).toString(),
		},
		{
			title: "Receita Mensal",
			value: use(getReceita()).receita.media.toString(),
		},
		{
			title: "Crédito",
			value: use(kpiTotalCredito()).toString(),
			otherValue: {
				subTitle: "Debito",
				subValue: use(kpiTotalDebito()).toString(),
			},
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
			<FactTable initialData={usersData} />
		</div>
	)
}
