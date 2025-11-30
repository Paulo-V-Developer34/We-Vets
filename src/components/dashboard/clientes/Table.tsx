"use client"

import { useState } from "react"
import { useRouter } from "next/navigation" // Import para refresh da página
import { Client } from "@/lib/types/client"
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table"
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Edit2, Trash2, Plus, Search } from "lucide-react"
import { toast } from "sonner"
import { ClientModal } from "./ClientModal"

interface ClientTableProps {
	initialData: Client[]
}

export function ClientTable({ initialData }: ClientTableProps) {
	const router = useRouter() // Hook para recarregar dados do servidor
	const [filterStatus, setFilterStatus] = useState("todos")

	// Estados do Modal
	const [isModalOpen, setIsModalOpen] = useState(false)
	const [selectedClient, setSelectedClient] = useState<Client | null>(null)

	// Filtragem (Client-side)
	// Nota: initialData vem atualizado do servidor quando router.refresh() é chamado
	const filteredData = initialData.filter((client) => {
		if (filterStatus === "todos") return true
		return client.status.toLowerCase() === filterStatus
	})

	// Ação: Abrir modal para CRIAR
	const handleCreate = () => {
		setSelectedClient(null)
		setIsModalOpen(true)
	}

	// Ação: Abrir modal para EDITAR
	const handleEdit = (client: Client) => {
		setSelectedClient(client)
		setIsModalOpen(true)
	}

	// Callback chamado quando a Server Action termina com sucesso
	const handleSuccess = () => {
		setIsModalOpen(false)
		// Em uma aplicação real com DB, isso recarrega os dados do page.tsx
		// garantindo que a tabela mostre os dados mais recentes do banco.
		router.refresh()
	}

	// Ação: DELETAR (Ainda client-side simulado por enquanto)
	const handleDelete = (id: string) => {
		// Para deletar via Server Action, você criaria uma action similar à de salvar
		toast.error("Funcionalidade de deletar", {
			description: "Necessário implementar Server Action de delete.",
		})
	}

	return (
		<div className="space-y-4">
			{/* ATENÇÃO: Aqui removemos o onSave e passamos onSuccess 
         O Modal agora é autônomo para salvar os dados.
      */}
			<ClientModal
				isOpen={isModalOpen}
				onClose={() => setIsModalOpen(false)}
				onSuccess={handleSuccess}
				clientToEdit={selectedClient}
			/>

			{/* Barra de Ações e Filtros */}
			<div className="flex flex-col sm:flex-row justify-between gap-3 items-end sm:items-center bg-white p-4 rounded-lg border shadow-sm">
				<div className="flex gap-3 w-full sm:w-auto">
					<div className="w-full sm:w-[200px]">
						<Select onValueChange={setFilterStatus} defaultValue="todos">
							<SelectTrigger>
								<SelectValue placeholder="Status" />
							</SelectTrigger>
							<SelectContent>
								<SelectItem value="todos">Todos os Status</SelectItem>
								<SelectItem value="ativo">Ativos</SelectItem>
								<SelectItem value="inativo">Inativos</SelectItem>
							</SelectContent>
						</Select>
					</div>
					<Button variant="outline" size="icon">
						<Search className="h-4 w-4" />
					</Button>
				</div>

				<Button
					onClick={handleCreate}
					className="bg-emerald-600 hover:bg-emerald-700 text-white w-full sm:w-auto gap-2"
				>
					<Plus className="h-4 w-4" />
					Novo Cliente
				</Button>
			</div>

			{/* Tabela */}
			<div className="rounded-md border bg-white shadow-sm overflow-hidden">
				<div className="bg-emerald-700 px-4 py-3 border-b border-emerald-800">
					<div className="grid grid-cols-6 gap-4 text-xs font-semibold text-white uppercase tracking-wider">
						<div className="col-span-2">Cliente / Email</div>
						<div>Status</div>
						<div>Última Compra</div>
						<div>LTV (Valor)</div>
						<div className="text-right">Ações</div>
					</div>
				</div>

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
											onClick={() => handleEdit(client)}
										>
											<Edit2 className="h-4 w-4" />
										</Button>
										<Button
											variant="ghost"
											size="icon"
											className="h-8 w-8 text-red-500 hover:text-red-700 hover:bg-red-50"
											onClick={() => handleDelete(client.id)}
										>
											<Trash2 className="h-4 w-4" />
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
