import { Dashboard } from "@/components/dashboard/dre/dashboard"
import { DreLineItem, DreTable } from "@/components/dashboard/dre/table" // Importando a tipagem e o componente
import { Button } from "@/components/ui/button"
import { Download, Printer } from "lucide-react"

async function getDreData(): Promise<DreLineItem[]> {
	// Simulando dados do backend
	return [
		{
			id: "1",
			label: "Receita Bruta",
			value: 45473.05,
			type: "income",
			indentLevel: 0,
		},
		{
			id: "2",
			label: "Deduções",
			value: 2073.05,
			type: "deduction",
			indentLevel: 0,
		},
		{
			id: "3",
			label: "Receita Líquida",
			value: 43400.0,
			type: "total",
			indentLevel: 0,
		},
		{
			id: "4",
			label: "Custos dos Serviços",
			value: 11760.0,
			type: "deduction",
			indentLevel: 0,
		},
		{
			id: "5",
			label: "Lucro Bruto",
			value: 31640.0,
			type: "total",
			indentLevel: 0,
		},
		{
			id: "6",
			label: "Despesas Operacionais",
			value: 9660.0,
			type: "deduction",
			indentLevel: 0,
		},
		{
			id: "7",
			label: "Resultado Operacional",
			value: 21980.0,
			type: "total",
			indentLevel: 0,
		},
		{
			id: "8",
			label: "Receitas Financeiras",
			value: 350.0,
			type: "income",
			indentLevel: 0,
		},
		{
			id: "9",
			label: "Despesas Financeiras",
			value: 168.0,
			type: "deduction",
			indentLevel: 0,
		},
		{
			id: "10",
			label: "Lucro Antes do IR",
			value: 22162.0,
			type: "total",
			indentLevel: 0,
		},
		{
			id: "11",
			label: "Imposto de Renda",
			value: 1344.0,
			type: "deduction",
			indentLevel: 0,
		},
		{
			id: "12",
			label: "Lucro Líquido",
			value: 20818.0,
			type: "grand-total",
			indentLevel: 0,
		},
	]
}

export default async function DrePage() {
	const dreData = await getDreData()

	return (
		<main className="min-h-screen bg-gray-50/50 p-6 space-y-6">
			{/* Page Header (Server Side) */}
			<div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
				<div>
					<h1 className="text-2xl font-bold text-gray-800">
						Demonstração do Resultado do Exercício (DRE)
					</h1>
					<p className="text-sm text-gray-500">
						Visão mensal detalhada da performance e rentabilidade da clínica.
					</p>
				</div>

				<div className="flex items-center gap-2">
					<Button
						variant="outline"
						className="bg-white hover:bg-gray-50 text-gray-700 gap-2 h-9"
					>
						<Download className="w-4 h-4" />
						Exportar
					</Button>
					<Button className="bg-emerald-700 hover:bg-emerald-800 text-white gap-2 h-9">
						<Printer className="w-4 h-4" />
						Imprimir
					</Button>
				</div>
			</div>

			{/* Top Metrics (Client Side) */}
			<Dashboard />

			{/* Main Content: Sidebar + Table (Client Side) */}
			<DreTable data={dreData} />
		</main>
	)
}
