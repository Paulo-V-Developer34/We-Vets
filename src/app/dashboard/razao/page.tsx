import { Dashboard } from "@/components/dashboard/razao/dashboard"
import { TransactionsTable } from "@/components/dashboard/razao/table"
import { Button } from "@/components/ui/button"
import { Download, Printer, RefreshCw } from "lucide-react"

// Simulando data fetching no servidor
async function getTransactions() {
	// Em um caso real, isso viria do banco de dados (Prisma, etc)
	return [
		{
			id: "1",
			date: "24/10",
			description: "Compra de Medicamentos",
			debitAccount: "Despesas",
			creditAccount: "Banco",
			movement: -250.0,
			balance: -3480.0,
		},
		{
			id: "2",
			date: "23/10",
			description: "Consulta Dr. Pedro",
			debitAccount: "Caixa",
			creditAccount: "Receitas",
			movement: 150.0,
			balance: -3230.0,
		},
		{
			id: "3",
			date: "23/10",
			description: "Venda de Ração",
			debitAccount: "Caixa",
			creditAccount: "Receitas",
			movement: 85.0,
			balance: -3380.0,
		},
		{
			id: "4",
			date: "22/10",
			description: "Pagamento de Luz",
			debitAccount: "Despesas",
			creditAccount: "Banco",
			movement: -420.0,
			balance: -3465.0,
		},
	]
}

export default async function AccountingPage() {
	const transactionsData = await getTransactions()

	return (
		<main className="min-h-screen bg-gray-50/50 p-6 space-y-6">
			{/* Top Header Section */}
			<div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
				<div>
					<h1 className="text-2xl font-bold text-gray-800">Razão Contábil</h1>
					<p className="text-sm text-gray-500">
						Visão por conta com saldos acumulados, análise visual e exportação
					</p>
				</div>

				<div className="flex items-center gap-2">
					<Button
						variant="outline"
						className="bg-white hover:bg-gray-50 text-gray-700 gap-2"
					>
						<Download className="w-4 h-4" />
						Exportar
					</Button>
					<Button
						variant="outline"
						className="bg-white hover:bg-gray-50 text-gray-700 gap-2"
					>
						<Printer className="w-4 h-4" />
						Imprimir
					</Button>
					<Button className="bg-emerald-600 hover:bg-emerald-700 text-white gap-2">
						<RefreshCw className="w-4 h-4" />
						Atualizar
					</Button>
				</div>
			</div>

			{/* Client Component: Charts & KPIs */}
			<Dashboard />

			{/* Client Component: Table */}
			<TransactionsTable data={transactionsData} />
		</main>
	)
}
