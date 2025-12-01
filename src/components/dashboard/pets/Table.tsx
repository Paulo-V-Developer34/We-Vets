"use client"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { useState } from "react"
import { useRouter } from "next/navigation"
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
import { Edit2, Trash2, Plus, Search, Dog, Cat, Bird } from "lucide-react" // Ícones de animais
import { toast } from "sonner"
import { PetModal } from "./PetModal"
import { petDelete } from "@/lib/model/pet"
import { PetType } from "@/lib/types/pet"
import { Input } from "@/components/ui/input"

interface PetTableProps {
	initialData: PetType[]
}

export function PetTable({ initialData }: PetTableProps) {
	const router = useRouter()
	const [filterSpecies, setFilterSpecies] = useState("todos")
	const [searchTerm, setSearchTerm] = useState("")

	const [isModalOpen, setIsModalOpen] = useState(false)
	const [selectedPet, setSelectedPet] = useState<PetType | null>(null)

	// Filtragem combinada (Busca por nome + Filtro por espécie)
	const filteredData = initialData.filter((pet) => {
		const matchesSearch = (pet.nome || "")
			.toLowerCase()
			.includes(searchTerm.toLowerCase())
		const matchesSpecies =
			filterSpecies === "todos" ? true : pet.especie === filterSpecies
		return matchesSearch && matchesSpecies
	})

	const handleCreate = () => {
		setSelectedPet(null)
		setIsModalOpen(true)
	}

	const handleEdit = (pet: PetType) => {
		setSelectedPet(pet)
		setIsModalOpen(true)
	}

	const handleSuccess = () => {
		setIsModalOpen(false)
		router.refresh()
	}

	const handleDelete = async (id: string) => {
		if (!confirm("Tem certeza que deseja remover este pet?")) return

		const resultado = await petDelete(id)

		if (resultado.errors) {
			toast.error(resultado.errors.err[0])
		} else {
			toast.success("Pet removido com sucesso")
			router.refresh()
		}
	}

	// Função auxiliar para ícone da espécie
	const getSpeciesIcon = (species: string) => {
		switch (species) {
			case "Gato":
				return <Cat className="w-4 h-4 text-emerald-600" />
			case "Ave":
				return <Bird className="w-4 h-4 text-emerald-600" />
			default:
				return <Dog className="w-4 h-4 text-emerald-600" />
		}
	}

	return (
		<div className="space-y-4">
			<PetModal
				isOpen={isModalOpen}
				onClose={() => setIsModalOpen(false)}
				onSuccess={handleSuccess}
				petToEdit={selectedPet}
			/>

			{/* Barra de Filtros */}
			<div className="flex flex-col sm:flex-row justify-between gap-3 items-end sm:items-center bg-white p-4 rounded-lg border shadow-sm">
				<div className="flex gap-3 w-full sm:w-auto">
					{/* Filtro por Espécie */}
					<div className="w-full sm:w-[200px]">
						<Select onValueChange={setFilterSpecies} defaultValue="todos">
							<SelectTrigger>
								<SelectValue placeholder="Espécie" />
							</SelectTrigger>
							<SelectContent>
								<SelectItem value="todos">Todas as Espécies</SelectItem>
								<SelectItem value="Cachorro">Cachorros</SelectItem>
								<SelectItem value="Gato">Gatos</SelectItem>
								<SelectItem value="Ave">Aves</SelectItem>
							</SelectContent>
						</Select>
					</div>

					{/* Busca Simples */}
					<div className="relative w-full sm:w-[200px]">
						<Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
						<Input
							placeholder="Buscar pet..."
							className="pl-8"
							type="text"
							value={searchTerm}
							onChange={(e) => setSearchTerm(e.target.value)}
						/>
					</div>
				</div>

				<Button
					onClick={handleCreate}
					className="bg-emerald-600 hover:bg-emerald-700 text-white w-full sm:w-auto gap-2"
				>
					<Plus className="h-4 w-4" />
					Novo Pet
				</Button>
			</div>

			{/* Tabela */}
			<div className="rounded-md border bg-white shadow-sm overflow-hidden">
				<div className="bg-emerald-700 px-4 py-3 border-b border-emerald-800">
					<div className="grid grid-cols-12 gap-4 text-xs font-semibold text-white uppercase tracking-wider items-center">
						<div className="col-span-1 hidden sm:block">Foto</div>
						<div className="col-span-5 sm:col-span-3">Nome / Dono</div>
						<div className="col-span-3 hidden sm:block">Espécie / Raça</div>
						<div className="col-span-2 hidden md:block">
							Detalhes (Idade/Peso)
						</div>
						<div className="col-span-6 sm:col-span-3 text-right">Ações</div>
					</div>
				</div>

				<Table>
					<TableBody>
						{filteredData.length === 0 && (
							<TableRow>
								<TableCell
									colSpan={5}
									className="h-24 text-center text-muted-foreground"
								>
									Nenhum pet encontrado.
								</TableCell>
							</TableRow>
						)}

						{filteredData.map((pet) => (
							<TableRow
								key={pet.id}
								className="hover:bg-gray-50 block sm:table-row"
							>
								<TableCell className="w-full sm:w-auto block sm:table-cell py-2 sm:py-4">
									<div className="grid grid-cols-12 gap-4 items-center">
										{/* Nome e Dono */}
										<div className="col-span-5 sm:col-span-3 flex flex-col">
											<span className="text-emerald-950 font-bold">
												{pet.nome}
											</span>
											{/* Supondo que o objeto pet tenha o relacionamento 'owner' ou 'dono' carregado */}
											<span className="text-muted-foreground text-xs flex items-center gap-1">
												Dono telefone: {pet.dono?.telefone || "Não informado"}
											</span>
										</div>

										{/* Espécie e Raça */}
										<div className="col-span-5 sm:col-span-3 hidden sm:flex flex-col">
											<div className="flex items-center gap-2 font-medium text-gray-700">
												{getSpeciesIcon(pet.especie)}
												{pet.especie}
											</div>
											<span className="text-xs text-muted-foreground ml-6">
												{pet.raca || "Sem raça definida"}
											</span>
										</div>

										{/* Detalhes Físicos */}
										<div className="col-span-2 hidden md:flex flex-col text-sm text-gray-600">
											<span>{pet.nascimento?.getFullYear()} anos</span>
											<span className="text-xs text-muted-foreground">
												{pet.raca} kg
											</span>
										</div>

										{/* Ações */}
										<div className="col-span-5 sm:col-span-3 flex justify-end gap-2">
											<Button
												variant="ghost"
												size="icon"
												className="h-8 w-8 text-emerald-600 hover:text-emerald-700 hover:bg-emerald-50"
												onClick={() => handleEdit(pet)}
											>
												<Edit2 className="h-4 w-4" />
											</Button>
											<Button
												variant="ghost"
												size="icon"
												className="h-8 w-8 text-red-500 hover:text-red-700 hover:bg-red-50"
												onClick={() => handleDelete(pet.id)}
											>
												<Trash2 className="h-4 w-4" />
											</Button>
										</div>
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
