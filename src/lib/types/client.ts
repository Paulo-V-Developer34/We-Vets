// types.ts
export type Client = {
	id: string
	name: string
	email: string
	status: "Ativo" | "Inativo" | "Pendente"
	lastPurchase: string
	ltv: number // Lifetime Value
}

export type KpiClient = {
	totalClients: number
	activeClients: number
	newClients: number
	churnRate: number
}
