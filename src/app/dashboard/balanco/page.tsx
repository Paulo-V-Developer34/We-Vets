import { Dashboard } from "@/components/dashboard/balanco/dashboard"
import {
	BalanceContent,
	BalanceItem,
} from "@/components/dashboard/balanco/table"
import { Button } from "@/components/ui/button"
import { Download } from "lucide-react"

async function getBalanceData() {
	// Dados do Resumo (Cards Topo)
	const summary = {
		totalAssets: 63100.5,
		totalLiabilities: 43000.0,
		equity: 12100.5,
		cash: 12500.5,
	}

	// Dados da Tabela
	const items: BalanceItem[] = [
		{ id: "1", account: "Caixa", group: "Ativo", balance: 12500.5 },
		{
			id: "2",
			account: "Bancos c/movimento",
			group: "Ativo",
			balance: 42000.0,
		},
		{ id: "3", account: "Estoques", group: "Ativo", balance: 8600.0 },
		{ id: "4", account: "Fornecedores", group: "Passivo", balance: 18000.0 },
		{ id: "5", account: "Empréstimos", group: "Passivo", balance: 25000.0 },
		{ id: "6", account: "Capital Social", group: "PL", balance: 12000.0 },
		{ id: "7", account: "Reservas", group: "PL", balance: 100.5 },
		// Linhas de totais calculados
		{
			id: "total-ativo",
			account: "Total Ativo",
			group: "Ativo",
			balance: 63100.5,
			isTotal: true,
		},
		{
			id: "total-passivo",
			account: "Total Passivo",
			group: "Passivo",
			balance: 43000.0,
			isTotal: true,
		},
		{
			id: "total-pl",
			account: "Patrimônio Líquido",
			group: "PL",
			balance: 12100.5,
			isTotal: true,
		},
	]

	// Dados do Gráfico
	const chartData = [
		{ name: "Ativo", value: 63100.5, color: "#10b981" }, // Emerald 500
		{ name: "Passivo", value: 43000.0, color: "#fb7185" }, // Rose 400
	]

	return { summary, items, chartData }
}

export default async function BalanceSheetPage() {
	const data = await getBalanceData()

	return (
		<main className="min-h-screen bg-gray-50/50 p-6 space-y-6">
			{/* Header Section */}
			<div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
				<div>
					<h1 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
						Balanço Patrimonial —{" "}
						<span className="text-gray-500 font-normal">Instantâneo</span>
					</h1>
					<p className="text-sm text-gray-500">
						Ativos, Passivos e Patrimônio Líquido — pronto para apresentação.
					</p>
				</div>

				<div>
					<Button className="bg-emerald-800 hover:bg-emerald-900 text-white gap-2 h-9 shadow-sm">
						<Download className="w-4 h-4" />
						Baixar CSV
					</Button>
				</div>
			</div>

			{/* Dashboard Top Cards */}
			<Dashboard data={data.summary} />

			{/* Main Content (Table + Chart) */}
			<BalanceContent items={data.items} chartData={data.chartData} />
		</main>
	)
}
