"use client"

import { useState } from "react"
import { Client } from "@/lib/types/client"
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table"
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Edit2, Trash2, FileText, Search } from "lucide-react"

interface ClientTableProps {
	initialData: Client[]
}

export function ClientTable({ initialData }: ClientTableProps) {
	// Estado simples para simular filtro (em produção usaria URL params ou fetch)
	const [filterStatus, setFilterStatus] = useState("todos")

	const filteredData = initialData.filter((client) => {
		if (filterStatus === "todos") return true
		return client.status.toLowerCase() === filterStatus
	})

	return (
		<div className="space-y-4">
			{/* Barra de Filtros (Igual a imagem) */}
			<div className="flex flex-col sm:flex-row gap-3 items-end sm:items-center">
				<div className="w-full sm:w-[200px]">
					<Select defaultValue="nome">
						<SelectTrigger className="bg-white">
							<SelectValue placeholder="Buscar por" />
						</SelectTrigger>
						<SelectContent>
							<SelectItem value="nome">Nome</SelectItem>
							<SelectItem value="email">Email</SelectItem>
						</SelectContent>
					</Select>
				</div>

				<div className="w-full sm:w-[200px]">
					<Select onValueChange={setFilterStatus} defaultValue="todos">
						<SelectTrigger className="bg-white">
							<SelectValue placeholder="Status" />
						</SelectTrigger>
						<SelectContent>
							<SelectItem value="todos">Todos os Status</SelectItem>
							<SelectItem value="ativo">Ativos</SelectItem>
							<SelectItem value="inativo">Inativos</SelectItem>
						</SelectContent>
					</Select>
				</div>

				<Button className="bg-emerald-700 hover:bg-emerald-800 text-white w-full sm:w-auto">
					Filtrar
				</Button>
			</div>

			{/* Tabela */}
			<div className="rounded-md border bg-white shadow-sm overflow-hidden">
				<div className="bg-emerald-700 px-4 py-3 border-b border-emerald-800">
					{/* Header visual verde sólido como na imagem */}
					<div className="grid grid-cols-6 gap-4 text-xs font-semibold text-white uppercase tracking-wider">
						<div className="col-span-2">Cliente / Email</div>
						<div>Status</div>
						<div>Última Compra</div>
						<div>LTV (Valor)</div>
						<div className="text-right">Ações</div>
					</div>
				</div>

				{/* Usando o componente Table do Shadcn para o corpo */}
				<Table>
					<TableBody>
						{filteredData.map((client) => (
							<TableRow key={client.id} className="hover:bg-gray-50">
								<TableCell className="font-medium col-span-2">
									<div className="flex flex-col">
										<span className="text-emerald-950 font-semibold">
											{client.name}
										</span>
										<span className="text-muted-foreground text-xs">
											{client.email}
										</span>
									</div>
								</TableCell>
								<TableCell>
									<Badge
										className={`${
											client.status === "Ativo"
												? "bg-emerald-100 text-emerald-800 hover:bg-emerald-100"
												: client.status === "Inativo"
													? "bg-red-100 text-red-800 hover:bg-red-100"
													: "bg-yellow-100 text-yellow-800 hover:bg-yellow-100"
										}`}
									>
										{client.status}
									</Badge>
								</TableCell>
								<TableCell className="text-muted-foreground">
									{client.lastPurchase}
								</TableCell>
								<TableCell className="font-bold text-emerald-950">
									{new Intl.NumberFormat("pt-BR", {
										style: "currency",
										currency: "BRL",
									}).format(client.ltv)}
								</TableCell>
								<TableCell className="text-right">
									<div className="flex justify-end gap-2">
										<Button
											variant="ghost"
											size="icon"
											className="h-8 w-8 text-emerald-600 hover:text-emerald-700 hover:bg-emerald-50"
										>
											<Edit2 className="h-4 w-4" />
										</Button>
										<Button
											variant="ghost"
											size="icon"
											className="h-8 w-8 text-red-500 hover:text-red-700 hover:bg-red-50"
										>
											<Trash2 className="h-4 w-4" />
										</Button>
										<Button
											variant="ghost"
											size="icon"
											className="h-8 w-8 text-emerald-600 hover:text-emerald-700 hover:bg-emerald-50"
										>
											<FileText className="h-4 w-4" />
										</Button>
									</div>
								</TableCell>
							</TableRow>
						))}
					</TableBody>
				</Table>
			</div>
		</div>
	)
}
