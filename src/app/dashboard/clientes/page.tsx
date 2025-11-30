import { Header } from "@/components/dashboard/clientes/Header"
import { Kpis } from "@/components/dashboard/clientes/Kpis"
import { ClientTable } from "@/components/dashboard/clientes/Table"
import { Client, KpiClient } from "@/lib/types/client"

async function getDashboardData() {
	// Simulando dados do backend
	const clients: Client[] = [
		{
			id: "1",
			name: "Empresa de Rações Ltda",
			email: "contato@racoes.com",
			status: "Ativo",
			lastPurchase: "02/10/2025",
			ltv: 15420.0,
		},
		{
			id: "2",
			name: "Roberto Silva",
			email: "roberto.s@email.com",
			status: "Pendente",
			lastPurchase: "15/09/2025",
			ltv: 1200.0,
		},
		{
			id: "3",
			name: "Clínica Veterinária Central",
			email: "financeiro@vetcentral.com",
			status: "Ativo",
			lastPurchase: "19/10/2025",
			ltv: 8500.5,
		},
		{
			id: "4",
			name: "Ana Paula Souza",
			email: "ana.souza@email.com",
			status: "Inativo",
			lastPurchase: "20/05/2025",
			ltv: 450.0,
		},
	]

	const kpis: KpiClient = {
		totalClients: 1550,
		activeClients: 1240,
		newClients: 45,
		churnRate: 2.4,
	}

	return { clients, kpis }
}

export default async function DashboardPage() {
	const data = await getDashboardData()

	return (
		<div className="space-y-6">
			{/* Header alinhado sem padding extra */}
			<Header />

			{/* KPIs expandindo para ocupar a largura disponível do container pai */}
			<Kpis data={data.kpis} />

			{/* Tabela ocupando a largura total */}
			<ClientTable initialData={data.clients} />
		</div>
	)
}
