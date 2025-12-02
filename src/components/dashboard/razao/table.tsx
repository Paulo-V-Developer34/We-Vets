"use client"

import { Download } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table"

interface Transaction {
	id: string
	date: string
	description: string
	debitAccount: string
	creditAccount: string
	movement: number
	balance: number
}

interface TransactionsTableProps {
	data: Transaction[]
}

export function TransactionsTable({ data }: TransactionsTableProps) {
	return (
		<div className="mt-6 rounded-lg border bg-white shadow-sm overflow-hidden">
			{/* Header Customizado da Tabela (Verde Escuro) */}
			<div className="flex items-center justify-between bg-emerald-800 px-6 py-3 text-white">
				<h3 className="font-semibold text-lg">Lançamentos</h3>
				<Button
					variant="secondary"
					size="sm"
					className="bg-white text-emerald-800 hover:bg-emerald-50 h-8 gap-2"
				>
					<Download className="h-4 w-4" />
					CSV
				</Button>
			</div>

			{/* Tabela Shadcn */}
			<div className="p-0">
				<Table>
					<TableHeader>
						<TableRow className="hover:bg-transparent">
							<TableHead className="w-[100px] pl-6 font-bold text-gray-600">
								Data
							</TableHead>
							<TableHead className="font-bold text-gray-600">
								Descrição
							</TableHead>
							<TableHead className="font-bold text-gray-600 text-right">
								Conta Débito
							</TableHead>
							<TableHead className="font-bold text-gray-600 text-right">
								Conta Crédito
							</TableHead>
							<TableHead className="font-bold text-gray-600 text-right">
								Movimento
							</TableHead>
							<TableHead className="font-bold text-gray-600 text-right pr-6">
								Saldo
							</TableHead>
						</TableRow>
					</TableHeader>
					<TableBody>
						{data.map((item) => (
							<TableRow key={item.id} className="hover:bg-gray-50">
								<TableCell className="pl-6 font-medium text-gray-500">
									{item.date}
								</TableCell>
								<TableCell className="font-medium">
									{item.description}
								</TableCell>
								<TableCell className="text-right text-gray-500">
									{item.debitAccount}
								</TableCell>
								<TableCell className="text-right text-gray-500">
									{item.creditAccount}
								</TableCell>
								<TableCell className="text-right font-semibold text-gray-900">
									{item.movement.toLocaleString("pt-BR", {
										minimumFractionDigits: 2,
									})}
								</TableCell>
								<TableCell className="text-right pr-6 font-semibold text-gray-900">
									{item.balance.toLocaleString("pt-BR", {
										minimumFractionDigits: 2,
									})}
								</TableCell>
							</TableRow>
						))}
					</TableBody>
				</Table>
			</div>
		</div>
	)
}
