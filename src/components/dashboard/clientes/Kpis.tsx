import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Users, UserCheck, UserPlus, TrendingDown } from "lucide-react"
import { KpiClient } from "@/lib/types/client"

interface KpisProps {
	data: KpiClient
}

export function Kpis({ data }: KpisProps) {
	return (
		<div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mb-8">
			{/* Card 1: Total de Clientes (Borda Esquerda Verde) */}
			<Card className="border-l-4 border-l-emerald-600 shadow-sm">
				<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
					<CardTitle className="text-sm font-medium text-slate-600">
						Total de Clientes
					</CardTitle>
					<Users className="h-4 w-4 text-emerald-600" />
				</CardHeader>
				<CardContent>
					<div className="text-2xl font-bold text-slate-900">
						{data.totalClients}
					</div>
					<p className="text-xs text-slate-500 mt-1">
						Base completa cadastrada
					</p>
				</CardContent>
			</Card>

			{/* Card 2: Clientes Ativos (Padrão) */}
			<Card className="shadow-sm">
				<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
					<CardTitle className="text-sm font-medium text-slate-600">
						Clientes Ativos
					</CardTitle>
					<UserCheck className="h-4 w-4 text-emerald-600" />
				</CardHeader>
				<CardContent>
					<div className="text-2xl font-bold text-slate-900">
						{data.activeClients}
					</div>
					<p className="text-xs text-slate-500 mt-1">
						Compras nos últimos 30 dias
					</p>
				</CardContent>
			</Card>

			{/* Card 3: Novos Clientes (Padrão) */}
			<Card className="shadow-sm">
				<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
					<CardTitle className="text-sm font-medium text-slate-600">
						Novos (Mês)
					</CardTitle>
					<UserPlus className="h-4 w-4 text-emerald-600" />
				</CardHeader>
				<CardContent>
					<div className="text-2xl font-bold text-slate-900">
						+{data.newClients}
					</div>
					<p className="text-xs text-slate-500 mt-1">Cadastrados em Novembro</p>
				</CardContent>
			</Card>

			{/* Card 4: Churn Rate (Borda Direita Verde - seguindo seu padrão) */}
			<Card className="border-r-4 border-r-emerald-600 shadow-sm">
				<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
					<CardTitle className="text-sm font-medium text-slate-600">
						Taxa de Churn
					</CardTitle>
					<TrendingDown className="h-4 w-4 text-red-500" />
				</CardHeader>
				<CardContent>
					<div className="text-2xl font-bold text-slate-900">
						{data.churnRate}%
					</div>
					<p className="text-xs text-slate-500 mt-1">
						Clientes perdidos:{" "}
						<span className="font-medium text-red-600">Alta</span>
					</p>
				</CardContent>
			</Card>
		</div>
	)
}
