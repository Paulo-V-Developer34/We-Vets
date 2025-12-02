"use client"

import { Card, CardContent } from "@/components/ui/card"

interface KPICardProps {
	label: string
	value: number
	sub: string
	highlight?: boolean
}

export function Dashboard() {
	return (
		<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
			<KPICard
				label="Receita Bruta"
				value={45473.05}
				sub="Serviços e produtos"
			/>
			<KPICard label="Deduções" value={2073.05} sub="Impostos e descontos" />
			<KPICard label="Receita Líquida" value={43400.0} sub="Após deduções" />
			<KPICard
				label="Resultado Operacional"
				value={21980.0}
				sub="Indicador de saúde operacional"
				highlight
			/>
		</div>
	)
}

function KPICard({ label, value, sub, highlight }: KPICardProps) {
	return (
		<Card
			className={`shadow-sm border-l-4 ${highlight ? "border-l-emerald-600" : "border-l-emerald-500"}`}
		>
			<CardContent className="p-5">
				<h3 className="text-sm font-medium text-gray-500 mb-1">{label}</h3>
				<p className="text-2xl font-bold text-gray-900 mb-1">
					R$ {value.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
				</p>
				<p className="text-xs text-gray-400">{sub}</p>
			</CardContent>
		</Card>
	)
}
