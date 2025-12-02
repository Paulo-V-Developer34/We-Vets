"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select"
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table"
import { cn } from "@/lib/utils" // Utilitário padrão do shadcn

// Tipagem para as linhas do DRE
export interface DreLineItem {
	id: string
	label: string
	value: number
	type: "income" | "deduction" | "total" | "grand-total" | "info"
	indentLevel?: number // 0 para raiz, 1 para indentado
}

interface DreTableProps {
	data: DreLineItem[]
}

export function DreTable({ data }: DreTableProps) {
	return (
		<div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
			{/* ASIDE: Filtros e Margens */}
			<Card className="h-fit shadow-sm lg:col-span-1">
				<CardContent className="p-5 space-y-6">
					{/* Inputs */}
					<div className="space-y-4">
						<div className="space-y-1">
							<label className="text-xs font-medium text-gray-500">
								Período
							</label>
							<Input
								type="month"
								defaultValue="2025-12"
								className="bg-gray-50"
							/>
						</div>

						<div className="space-y-1">
							<label className="text-xs font-medium text-gray-500">Conta</label>
							<Select defaultValue="all">
								<SelectTrigger className="bg-gray-50">
									<SelectValue placeholder="Selecione" />
								</SelectTrigger>
								<SelectContent>
									<SelectItem value="all">Todas as contas</SelectItem>
									<SelectItem value="matriz">Matriz</SelectItem>
								</SelectContent>
							</Select>
						</div>

						<Button className="w-full bg-emerald-700 hover:bg-emerald-800 text-white">
							Aplicar
						</Button>
					</div>

					{/* Resumo de Margens */}
					<div className="pt-4 border-t space-y-3">
						<div className="flex justify-between items-center">
							<span className="text-sm text-gray-500">Margem Bruta</span>
							<span className="font-bold text-gray-800">72.90%</span>
						</div>
						<div className="flex justify-between items-center">
							<span className="text-sm text-gray-500">Margem Líquida</span>
							<span className="font-bold text-gray-800">47.97%</span>
						</div>
						<div className="flex justify-between items-center">
							<span className="text-sm text-gray-500">EBITDA</span>
							<span className="font-bold text-gray-800">R$ 7.200,00</span>
						</div>
					</div>
				</CardContent>
			</Card>

			{/* MAIN: Tabela DRE */}
			<Card className="shadow-sm lg:col-span-3 border-none bg-white">
				<CardHeader className="px-0 pt-0 pb-4">
					<CardTitle className="text-base text-gray-700 font-semibold">
						DRE — Dezembro de 2025
					</CardTitle>
				</CardHeader>
				<CardContent className="p-0">
					<Table>
						<TableHeader>
							<TableRow className="hover:bg-transparent border-b border-gray-100">
								<TableHead className="w-[60%] pl-0 text-gray-500">
									Conta
								</TableHead>
								<TableHead className="text-right pr-4 text-gray-500">
									Valor (R$)
								</TableHead>
							</TableRow>
						</TableHeader>
						<TableBody>
							{data.map((item) => (
								<TableRow
									key={item.id}
									className={cn(
										"border-b border-gray-50 hover:bg-gray-50/50",
										item.type === "grand-total" &&
											"bg-emerald-50 hover:bg-emerald-100/50 border-none",
										item.type === "total" && "bg-gray-50/80 font-semibold",
									)}
								>
									<TableCell
										className={cn(
											"py-3",
											item.indentLevel === 1 && "pl-8",
											item.type === "total" || item.type === "grand-total"
												? "font-bold text-gray-800"
												: "text-gray-600 pl-0",
										)}
									>
										{item.label}
									</TableCell>
									<TableCell
										className={cn(
											"text-right pr-4 font-medium",
											item.type === "deduction"
												? "text-red-500"
												: "text-gray-800",
											(item.type === "total" || item.type === "grand-total") &&
												"font-bold",
										)}
									>
										{item.type === "deduction" ? "- " : ""}
										R${" "}
										{item.value.toLocaleString("pt-BR", {
											minimumFractionDigits: 2,
										})}
									</TableCell>
								</TableRow>
							))}
						</TableBody>
					</Table>
				</CardContent>
			</Card>
		</div>
	)
}
