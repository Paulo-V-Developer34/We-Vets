"use client"

import { Card, CardContent } from "@/components/ui/card"

interface BalanceSummary {
	totalAssets: number
	totalLiabilities: number
	equity: number
	cash: number
}

export function Dashboard({ data }: { data: BalanceSummary }) {
	return (
		<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
			<KPICard label="Ativo Total" value={data.totalAssets} />
			<KPICard label="Passivo Total" value={data.totalLiabilities} />
			<KPICard label="Patrimônio Líquido" value={data.equity} />
			<KPICard label="Caixa" value={data.cash} />
		</div>
	)
}

function KPICard({ label, value }: { label: string; value: number }) {
	return (
		<Card className="shadow-sm border-l-4 border-l-emerald-500">
			<CardContent className="p-5">
				<h3 className="text-sm font-medium text-gray-500 mb-1">{label}</h3>
				<p className="text-2xl font-bold text-gray-900">
					R$ {value.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
				</p>
			</CardContent>
		</Card>
	)
}
