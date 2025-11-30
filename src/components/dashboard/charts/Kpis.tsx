"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Kpi } from "@/lib/types/charts"
import { DollarSign, CalendarCheck, Package, Users } from "lucide-react"

export default function ChartKpi({ kpi }: { kpi: Kpi }) {
	return (
		<div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
			<Card className="border-l-4 border-l-emerald-600 shadow-sm">
				<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
					<CardTitle className="text-sm font-medium text-slate-600">
						Receita (30d)
					</CardTitle>
					<DollarSign className="h-4 w-4 text-emerald-600" />
				</CardHeader>
				<CardContent>
					<div className="text-2xl font-bold text-slate-900">
						R$ {kpi.receita.valorTotal}
					</div>
					<p className="text-xs text-slate-500 mt-1">
						Ticket médio:{" "}
						<span className="font-medium text-emerald-700">
							R$ {kpi.receita.media}
						</span>
					</p>
				</CardContent>
			</Card>

			<Card className="shadow-sm">
				<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
					<CardTitle className="text-sm font-medium text-slate-600">
						Agendamentos (7d)
					</CardTitle>
					<CalendarCheck className="h-4 w-4 text-emerald-600" />
				</CardHeader>
				<CardContent>
					<div className="text-2xl font-bold text-slate-900">
						{kpi.agendamento.aFazer}
					</div>
					<p className="text-xs text-slate-500 mt-1">
						Realizados:{" "}
						<span className="font-medium text-emerald-700">
							{kpi.agendamento.feitos}
						</span>
					</p>
				</CardContent>
			</Card>

			<Card className="shadow-sm">
				<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
					<CardTitle className="text-sm font-medium text-slate-600">
						Produtos em estoque
					</CardTitle>
					<Package className="h-4 w-4 text-emerald-600" />
				</CardHeader>
				<CardContent>
					<div className="text-2xl font-bold text-slate-900">
						{kpi.produtos.estoque}
					</div>
					<p className="text-xs text-slate-500 mt-1">
						Faltando:{" "}
						<span className="font-medium text-red-600">
							{kpi.produtos.faltando}
						</span>
					</p>
				</CardContent>
			</Card>

			<Card className="border-r-4 border-r-emerald-600 shadow-sm">
				<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
					<CardTitle className="text-sm font-medium text-slate-600">
						Pets ativos
					</CardTitle>
					<Users className="h-4 w-4 text-emerald-600" />
				</CardHeader>
				<CardContent>
					<div className="text-2xl font-bold text-slate-900">
						{kpi.pets.quantidade}
					</div>
					<p className="text-xs text-slate-500 mt-1">
						Últ. cadastro: {kpi.pets.ultimoCadastrado.toString()}
					</p>
				</CardContent>
			</Card>
		</div>
	)
}
