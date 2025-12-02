"use client"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { useState } from "react"
import { useRouter } from "next/navigation" // Import para refresh da página
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
import { Edit2, Trash2, Plus, Search } from "lucide-react"
import { toast } from "sonner"
import { ClientModal } from "./ClientModal"
import { Dono, User } from "../../../../generated/prisma"
import { ClienteUser } from "@/lib/types/schema/cliente"
import { clientDelete } from "@/lib/model/client"

interface ClientTableProps {
	initialData: User[]
}

export function ClientTable({ initialData }: { initialData: ClienteUser[] }) {
	const router = useRouter() // Hook para recarregar dados do servidor
	const [filterStatus, setFilterStatus] = useState("todos")

	// Estados do Modal
	const [isModalOpen, setIsModalOpen] = useState(false)
	const [selectedClient, setSelectedClient] = useState<ClienteUser | null>(null)

	// Filtragem (Client-side)
	// Nota: initialData vem atualizado do servidor quando router.refresh() é chamado
	const filteredData = initialData.filter((user) => {
		if (filterStatus === "todos") return true
		// return (user?.name || "").toLowerCase() === filterStatus
	})

	// Ação: Abrir modal para CRIAR
	const handleCreate = () => {
		setSelectedClient(null)
		setIsModalOpen(true)
	}

	// Ação: Abrir modal para EDITAR
	const handleEdit = (client: ClienteUser) => {
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
	const handleDelete = async (id: string) => {
		// Para deletar via Server Action, você criaria uma action similar à de salvar
		const resultado = await clientDelete(id)

		if (resultado.errors) {
			toast.error(resultado.errors.err[0])
			// aqui você pode atualizar o estado ou refazer um fetch
		} else {
			toast.success("Usuário deletado com sucesso")
		}
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
				<Table>
					{/* NOVO: Tabela Cabeçalho (Header) */}
					<TableHeader className="bg-emerald-700 text-white hover:bg-emerald-700">
						<TableRow className="border-emerald-800">
							{/* 1. Nome/Email */}
							<TableHead className="text-white uppercase tracking-wider font-semibold w-[35%]">
								Cliente
							</TableHead>
							{/* 2. Avatar */}
							<TableHead className="text-white uppercase tracking-wider font-semibold w-[10%]">
								Foto
							</TableHead>
							{/* 3. Telefone */}
							<TableHead className="text-white uppercase tracking-wider font-semibold w-[20%]">
								Telefone
							</TableHead>
							{/* 4. Data de Criação */}
							<TableHead className="text-white uppercase tracking-wider font-semibold w-[20%]">
								Data Cadastro
							</TableHead>
							{/* 5. Ações */}
							<TableHead className="text-right text-white uppercase tracking-wider font-semibold w-[15%]">
								Ações
							</TableHead>
						</TableRow>
					</TableHeader>

					{/* Corpo da Tabela Corrigido */}
					<TableBody>
						{filteredData.map((client) => (
							<TableRow key={client.id} className="hover:bg-gray-50">
								{/* 1. Nome e Email */}
								<TableCell className="font-medium">
									<div className="flex flex-col">
										<span className="text-emerald-950 font-semibold">
											{client.name}
										</span>
										<span className="text-muted-foreground text-xs">
											{client.email}
										</span>
									</div>
								</TableCell>
								{/* 2. Avatar */}
								<TableCell className="text-muted-foreground">
									<Avatar className="h-9 w-9 border-2 border-emerald-700">
										<AvatarImage
											src={client.image || "/favicon.png"}
											alt="Dra. Ana"
										/>
										<AvatarFallback>DA</AvatarFallback>
									</Avatar>
								</TableCell>
								{/* 3. Telefone */}
								<TableCell className="font-bold text-emerald-950">
									{client.dono?.telefone}
								</TableCell>
								{/* 4. Data de Criação */}
								<TableCell className="font-bold text-emerald-950">
									{client.createdAt.toDateString()}
								</TableCell>
								{/* 5. Ações */}
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
