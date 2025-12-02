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
import { ProductModal } from "./RelatorioModal"
import {
	Dono,
	FatosFinanceiros,
	Operacao,
	User,
} from "../../../../generated/prisma"
import { ClienteUser } from "@/lib/types/schema/cliente"
import { clientDelete } from "@/lib/model/client"
import { ProductWithID } from "@/lib/types/product"
import { productDelete } from "@/lib/model/product"
import { FactWithoutDecimal } from "@/lib/types/fact"
import { factDelete } from "@/lib/model/fact"
import clsx from "clsx"

interface ProductProps {
	initialData: FactWithoutDecimal[]
}

export function FactTable({ initialData }: ProductProps) {
	const router = useRouter() // Hook para recarregar dados do servidor
	const [filterStatus, setFilterStatus] = useState("todos")

	// Estados do Modal
	const [isModalOpen, setIsModalOpen] = useState(false)
	const [selectedProduct, setSelectedProduct] =
		useState<FactWithoutDecimal | null>(null)

	// Filtragem (Client-side)
	// Nota: initialData vem atualizado do servidor quando router.refresh() é chamado
	const filteredData = initialData.filter((user) => {
		if (filterStatus === "todos") return true
		// return (user?.name || "").toLowerCase() === filterStatus
	})

	// Ação: Abrir modal para CRIAR
	const handleCreate = () => {
		setSelectedProduct(null)
		setIsModalOpen(true)
	}

	// Ação: Abrir modal para EDITAR
	const handleEdit = (product: FactWithoutDecimal) => {
		setSelectedProduct(product)
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
		const resultado = await factDelete(id)

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
			<ProductModal
				isOpen={isModalOpen}
				onClose={() => setIsModalOpen(false)}
				onSuccess={handleSuccess}
				productToEdit={selectedProduct}
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
				{/* Usamos o componente Table nativo do Shadcn/Radix */}
				<Table>
					{/* NOVO: Tabela Cabeçalho (Header) */}
					<TableHeader className="bg-emerald-700 text-white hover:bg-emerald-700">
						<TableRow className="border-emerald-800">
							{/* Ajuste os cabeçalhos TH para corresponderem aos TDs */}
							<TableHead className="text-white uppercase tracking-wider font-semibold w-[25%]">
								Descrição
							</TableHead>
							<TableHead className="text-white uppercase tracking-wider font-semibold w-[10%]">
								Valor
							</TableHead>
							<TableHead className="text-white uppercase tracking-wider font-semibold w-[10%]">
								Data
							</TableHead>
							{/* Removi o Tipo Patrimonial e Tipo Resultado do cabeçalho original, 
                        pois na imagem eles estão como DADOS, e as colunas originais são:
                        VALOR, DATA, PARCELAS, OPERAÇÃO, TIPO PATRIMONIAL, TIPO RESULTADO.
                        A imagem mostra 8 colunas de dados, mas os títulos que precisam 
                        de alinhamento (Descrição, Valor, Data, ...) são 8 no total.
                    */}
							<TableHead className="text-white uppercase tracking-wider font-semibold w-[10%]">
								Parcelas
							</TableHead>
							<TableHead className="text-white uppercase tracking-wider font-semibold w-[10%]">
								Operação
							</TableHead>
							<TableHead className="text-white uppercase tracking-wider font-semibold w-[15%]">
								Tipo Patrimonial
							</TableHead>
							<TableHead className="text-white uppercase tracking-wider font-semibold w-[10%]">
								Tipo Resultado
							</TableHead>
							<TableHead className="text-right text-white uppercase tracking-wider font-semibold w-[10%]">
								Ações
							</TableHead>
						</TableRow>
					</TableHeader>

					<TableBody>
						{filteredData.map((product) => (
							<TableRow key={product.id} className="hover:bg-gray-50">
								{/* Corpo da Tabela (Body) - 8 Células de Dados (TD) */}
								<TableCell className="font-bold text-emerald-950 w-[25%]">
									{product.descricao}
								</TableCell>
								<TableCell className="text-muted-foreground w-[10%]">
									{product.valor.toFixed(2)}
								</TableCell>
								<TableCell className="font-bold text-emerald-950 w-[10%]">
									{product.data.toDateString()}
								</TableCell>
								<TableCell className="font-bold text-emerald-950 w-[10%]">
									{product.parcelas > 1 ? product.parcelas : "Pago à vista"}
								</TableCell>
								<TableCell
									className={clsx(
										product.operacao === Operacao.CREDITO
											? "font-bold text-emerald-600 w-[10%]"
											: "font-bold text-red-600 w-[10%]",
									)}
								>
									{product.operacao}
								</TableCell>
								<TableCell className="font-bold text-emerald-950 w-[15%]">
									{product.tipoPatrimonial}
								</TableCell>
								<TableCell className="font-bold text-emerald-950 w-[10%]">
									{product.tipoResultado}
								</TableCell>
								<TableCell className="text-right w-[10%]">
									<div className="flex justify-end gap-2">
										<Button
											variant="ghost"
											size="icon"
											className="h-8 w-8 text-emerald-600 hover:text-emerald-700 hover:bg-emerald-50"
											onClick={() => handleEdit(product)}
										>
											<Edit2 className="h-4 w-4" />
										</Button>

										<Button
											variant="ghost"
											size="icon"
											className="h-8 w-8 text-red-500 hover:text-red-700 hover:bg-red-50"
											onClick={() => handleDelete(product.id)}
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
