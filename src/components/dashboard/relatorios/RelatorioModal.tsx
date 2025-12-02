"use client"

import { useActionState, useEffect, useRef, useState } from "react" // <--- Importe useRef
import { Client } from "@/lib/types/client"
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { saveClientAction } from "@/lib/actions/clientAction"
import { toast } from "sonner"
import { Loader2 } from "lucide-react"
import { FormMessage } from "@/lib/types/message"
import { clientCreat, clientUpdate } from "@/lib/model/client"
import { ClienteSchemaWithID, ClienteUser } from "@/lib/types/schema/cliente"
import { string } from "zod"
import {
	ClassPatrimonio,
	ClassResultado,
	FatosFinanceiros,
	Operacao,
	User,
} from "../../../../generated/prisma"
import { ProductWithID } from "@/lib/types/product"
import { productCreat, productUpdate } from "@/lib/model/product"
import { FactWithoutDecimal } from "@/lib/types/fact"
import { factCreat } from "@/lib/model/fact"

interface ProductModalProps {
	isOpen: boolean
	onClose: () => void
	productToEdit?: FactWithoutDecimal | null
	onSuccess?: () => void
}

// Estado inicial agora precisa do timestamp zerado
const initialState: FormMessage = {
	message: "",
	errors: {
		err: [],
	},
	timestamp: 0, // <--- Inicialize com 0
}

export function ProductModal({
	isOpen,
	onClose,
	productToEdit,
	onSuccess,
}: ProductModalProps) {
	const [state, action, isPending] = useActionState(factCreat, initialState)
	const [state2, action2] = useActionState(productUpdate, initialState)
	const [tipoContabil, setTipoContabil] = useState<ClassPatrimonio>(
		productToEdit?.tipoPatrimonial || ClassPatrimonio.ATIVO_CIRCULANTE,
	)
	const [tipoResultado, setTipoResultado] = useState<ClassResultado>(
		productToEdit?.tipoResultado || ClassResultado.DESPESAS_OPERACIONAIS,
	)
	const [tipoOperacao, setTipoOperacao] = useState<Operacao>(
		productToEdit?.operacao || Operacao.CREDITO,
	)

	// Ref para guardar o ID da última notificação exibida
	const lastToastTimestamp = useRef(state.timestamp)

	useEffect(() => {
		// Se o timestamp atual for igual ao último processado ou for 0 (inicial), não faz nada.
		if (
			state.timestamp === lastToastTimestamp.current ||
			state.timestamp === 0
		) {
			return
		}

		// Se chegou aqui, é uma NOVA atualização de estado
		if (state.errors) {
			toast.error(state.errors.err[0])
		} else if (state.message) {
			toast.success(state.message)
			if (onSuccess) onSuccess()
			onClose() // Fecha o modal
		}

		// Atualiza o ref para dizer "já processei essa resposta"
		lastToastTimestamp.current = state.timestamp
	}, [state, onClose, onSuccess])

	// Se o modal fechar, e quisermos garantir que o formulário "limpe" visualmente ao reabrir,
	// o useActionState não reseta sozinho.
	// O ideal aqui é confiar que ao mudar o `clientToEdit` ou `isOpen`,
	// os inputs pegarão o defaultValue correto.

	return (
		<Dialog open={isOpen} onOpenChange={onClose}>
			<DialogContent className="sm:max-w-[500px]">
				{/* ... (resto do JSX permanece idêntico) ... */}
				<DialogHeader>
					<DialogTitle>
						{productToEdit ? "Editar Produto" : "Novo Produto"}
					</DialogTitle>
					<DialogDescription>
						{productToEdit
							? "Visualize ou altere os detalhes do Produto abaixo."
							: "Preencha os dados para adicionar um novo Produto à base."}
					</DialogDescription>
				</DialogHeader>

				<form action={productToEdit ? action2 : action} className="space-y-4">
					{productToEdit && (
						<>
							<input type="hidden" name="id" value={productToEdit.id} />
						</>
					)}

					<div className="space-y-2">
						<Label htmlFor="date">Data</Label>
						{/* Note que usamos defaultValue com coalescência nula para garantir a troca de dados */}
						<Input
							id="date"
							name="date"
							type="date"
							defaultValue={
								productToEdit
									? productToEdit.data.toDateString()
									: new Date().toDateString()
							}
							// Se houver erro E o modal não foi fechado/reaberto (ou seja, tentativa falha), mostramos o valor digitado.
							// Mas o defaultValue acima já cobre a reabertura.
							className={state.errors?.err ? "border-red-500" : ""}
						/>
					</div>

					{/* ... Resto dos inputs (Email, Status, LTV) ... */}
					{/* A lógica é a mesma para os outros campos */}

					{/* Campo Email */}
					<div className="space-y-2">
						<Label htmlFor="description">descricao</Label>
						<Input
							id="description"
							name="description"
							type="text"
							placeholder="Produto para tratar coceira"
							defaultValue={productToEdit?.descricao || ""}
							className={state.errors?.err ? "border-red-500" : ""}
						/>
					</div>

					{/* Campo Senha */}
					<div className="space-y-2">
						<Label htmlFor="price">Preço</Label>
						<Input
							id="price"
							name="price"
							type="number"
							placeholder="20"
							defaultValue={productToEdit?.valor || 0}
							className={state.errors?.err ? "border-red-500" : ""}
						/>
					</div>

					{/* Campo Senha */}
					<div className="space-y-2">
						<Label htmlFor="parcela">Parcelas</Label>
						<Input
							id="parcela"
							name="parcela"
							type="number"
							placeholder="20"
							defaultValue={productToEdit?.parcelas || 1}
							className={state.errors?.err ? "border-red-500" : ""}
						/>
					</div>

					<div className="space-y-2">
						<Label htmlFor="operacao">Tipo de Operação</Label>
						<Select
							value={tipoOperacao}
							onValueChange={(val) => setTipoOperacao(val as Operacao)}
						>
							<SelectTrigger className="w-[180px]">
								<span>{tipoOperacao || "Selecione uma opção"}</span>
							</SelectTrigger>
							<SelectContent>
								<SelectItem value="CREDITO">CREDITO</SelectItem>
								<SelectItem value="DEBITO">DEBITO</SelectItem>
							</SelectContent>
						</Select>
						<input type="hidden" name="operacao" value={tipoOperacao} />
					</div>

					<div className="grid grid-cols-2 gap-4">
						<div className="space-y-2">
							<Label htmlFor="phone">Tipo Contábil</Label>
							<Select
								value={tipoContabil}
								onValueChange={(val) => setTipoContabil(val as ClassPatrimonio)}
							>
								<SelectTrigger className="w-[180px]">
									<span>{tipoContabil || "Selecione uma opção"}</span>
								</SelectTrigger>
								<SelectContent>
									<SelectItem value="ATIVO_CIRCULANTE">
										ATIVO_CIRCULANTE
									</SelectItem>
									<SelectItem value="ATIVO_NAO_CIRCULANTE">
										ATIVO_NAO_CIRCULANTE
									</SelectItem>
									<SelectItem value="ATIVO_PERMANENTE">
										ATIVO_PERMANENTE
									</SelectItem>
									<SelectItem value="PASSIVO_CIRCULANTE">
										PASSIVO_CIRCULANTE
									</SelectItem>
									<SelectItem value="PASSIVO_EXIGIVEL">
										PASSIVO_EXIGIVEL
									</SelectItem>
									<SelectItem value="PATRIMONIO_LIQUIDO">
										PATRIMONIO_LIQUIDO
									</SelectItem>
								</SelectContent>
							</Select>
							<input type="hidden" name="heritageType" value={tipoContabil} />
						</div>

						<div className="space-y-2">
							<Label htmlFor="phone">Tipo Resultado</Label>
							<Select
								value={tipoResultado}
								onValueChange={(val) => setTipoResultado(val as ClassResultado)}
							>
								<SelectTrigger className="w-[180px]">
									<span>{tipoResultado || "Selecione uma opção"}</span>
								</SelectTrigger>
								<SelectContent>
									<SelectItem value="DESPESAS_OPERACIONAIS">
										DESPESAS_OPERACIONAIS
									</SelectItem>
									<SelectItem value="DESPESAS_NAO_OPERACIONAIS">
										DESPESAS_NAO_OPERACIONAIS
									</SelectItem>
									<SelectItem value="RECEITAS_OPERACIONAIS">
										RECEITAS_OPERACIONAIS
									</SelectItem>
									<SelectItem value="RECEITAS_NAO_OPERACIONAIS">
										RECEITAS_NAO_OPERACIONAIS
									</SelectItem>
								</SelectContent>
							</Select>
							<input type="hidden" name="resultType" value={tipoResultado} />
						</div>
					</div>

					<DialogFooter>
						{state.errors?.err && (
							<p className="text-sm text-red-500">{state.errors.err[0]}</p>
						)}
						<Button
							type="button"
							variant="outline"
							onClick={onClose}
							disabled={isPending}
						>
							Cancelar
						</Button>
						<Button
							type="submit"
							className="bg-emerald-600 hover:bg-emerald-700"
							disabled={isPending}
						>
							{isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
							{productToEdit ? "Salvar Alterações" : "Adicionar Produto"}
						</Button>
					</DialogFooter>
				</form>
			</DialogContent>
		</Dialog>
	)
}
