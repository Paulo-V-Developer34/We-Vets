"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table"
import { Plus, Pencil, Trash2 } from "lucide-react"
import {
	PieChart,
	Pie,
	Cell,
	ResponsiveContainer,
	Legend,
	Tooltip,
} from "recharts"

// Tipos
export interface BalanceItem {
	id: string
	account: string
	group: "Ativo" | "Passivo" | "PL"
	balance: number
	isTotal?: boolean // Para estilizar as linhas de total
}

interface BalanceContentProps {
	items: BalanceItem[]
	chartData: { name: string; value: number; color: string }[]
}

export function BalanceContent({ items, chartData }: BalanceContentProps) {
	return (
		<div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
			{/* SEÇÃO ESQUERDA: TABELA (Ocupa 2 colunas) */}
			<Card className="lg:col-span-2 shadow-sm border-none bg-white">
				<CardHeader className="flex flex-row items-center justify-between pb-2 border-b border-gray-100">
					<div>
						<CardTitle className="text-base text-gray-700 font-semibold">
							Saldos (instantâneo)
						</CardTitle>
					</div>
					<div className="flex gap-2">
						<Button
							variant="outline"
							size="sm"
							className="h-8 gap-1 text-gray-600"
						>
							<Plus className="w-3 h-3" /> Adicionar
						</Button>
						<Button
							variant="ghost"
							size="sm"
							className="h-8 gap-1 text-gray-500"
						>
							<Pencil className="w-3 h-3" /> Editar
						</Button>
						<Button
							variant="ghost"
							size="sm"
							className="h-8 gap-1 text-gray-500 hover:text-red-500"
						>
							<Trash2 className="w-3 h-3" /> Excluir
						</Button>
					</div>
				</CardHeader>

				<CardContent className="p-0">
					<Table>
						<TableHeader>
							<TableRow className="hover:bg-transparent border-b border-gray-100">
								<TableHead className="w-[40%] pl-6 font-medium text-gray-500">
									Conta
								</TableHead>
								<TableHead className="font-medium text-gray-500">
									Grupo
								</TableHead>
								<TableHead className="text-right pr-6 font-medium text-gray-500">
									Saldo (R$)
								</TableHead>
							</TableRow>
						</TableHeader>
						<TableBody>
							{items.map((item) => (
								<TableRow
									key={item.id}
									className={
										item.isTotal
											? "bg-gray-50 hover:bg-gray-100 font-bold border-t border-gray-200"
											: "hover:bg-gray-50"
									}
								>
									<TableCell
										className={`pl-6 ${item.isTotal ? "text-gray-800" : "text-gray-600"}`}
									>
										{item.account}
									</TableCell>
									<TableCell className={item.isTotal ? "" : "text-gray-500"}>
										{item.group}
									</TableCell>
									<TableCell
										className={`text-right pr-6 ${item.isTotal ? "text-gray-900" : "text-gray-700"}`}
									>
										{item.balance.toLocaleString("pt-BR", {
											minimumFractionDigits: 2,
										})}
									</TableCell>
								</TableRow>
							))}
						</TableBody>
					</Table>
				</CardContent>
			</Card>

			{/* SEÇÃO DIREITA: GRÁFICO (Ocupa 1 coluna) */}
			<Card className="lg:col-span-1 shadow-sm border-none bg-white flex flex-col">
				<CardHeader className="pb-0 pt-6 px-6">
					<CardTitle className="text-sm text-gray-500 font-medium">
						Resumo — Ativo x Passivo
					</CardTitle>
				</CardHeader>
				<CardContent className="flex-1 flex items-center justify-center p-4 min-h-[300px]">
					<ResponsiveContainer width="100%" height={250}>
						<PieChart>
							<Pie
								data={chartData}
								cx="50%"
								cy="50%"
								innerRadius={60}
								outerRadius={85}
								paddingAngle={0}
								dataKey="value"
								stroke="none"
							>
								{chartData.map((entry, index) => (
									<Cell key={`cell-${index}`} fill={entry.color} />
								))}
							</Pie>
							<Tooltip
								formatter={(value: number) =>
									`R$ ${value.toLocaleString("pt-BR")}`
								}
							/>
							<Legend
								verticalAlign="bottom"
								height={36}
								iconType="circle"
								formatter={(value) => (
									<span className="text-sm text-gray-600 ml-1">{value}</span>
								)}
							/>
						</PieChart>
					</ResponsiveContainer>
				</CardContent>
			</Card>
		</div>
	)
}
