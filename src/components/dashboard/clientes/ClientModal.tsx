"use client"

import { useActionState, useEffect, useRef } from "react" // <--- Importe useRef
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

interface ClientModalProps {
	isOpen: boolean
	onClose: () => void
	clientToEdit?: Client | null
	onSuccess?: () => void
}

// Estado inicial agora precisa do timestamp zerado
const initialState = {
	success: false,
	message: "",
	errors: {},
	fields: {},
	timestamp: 0, // <--- Inicialize com 0
}

export function ClientModal({
	isOpen,
	onClose,
	clientToEdit,
	onSuccess,
}: ClientModalProps) {
	const [state, action, isPending] = useActionState(
		saveClientAction,
		initialState,
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
		if (state.success) {
			toast.success(state.message)
			if (onSuccess) onSuccess()
			onClose() // Fecha o modal
		} else if (state.message) {
			toast.error(state.message)
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
						{clientToEdit ? "Editar Cliente" : "Novo Cliente"}
					</DialogTitle>
					<DialogDescription>
						{clientToEdit
							? "Visualize ou altere os detalhes do cliente abaixo."
							: "Preencha os dados para adicionar um novo cliente à base."}
					</DialogDescription>
				</DialogHeader>

				<form action={action} className="space-y-4">
					{clientToEdit && (
						<input type="hidden" name="id" value={clientToEdit.id} />
					)}

					<div className="space-y-2">
						<Label htmlFor="name">Nome da Empresa / Cliente</Label>
						{/* Note que usamos defaultValue com coalescência nula para garantir a troca de dados */}
						<Input
							id="name"
							name="name"
							placeholder="Ex: PetShop Doce Lar"
							defaultValue={clientToEdit ? clientToEdit.name : ""}
							// Se houver erro E o modal não foi fechado/reaberto (ou seja, tentativa falha), mostramos o valor digitado.
							// Mas o defaultValue acima já cobre a reabertura.
							className={state.errors?.name ? "border-red-500" : ""}
						/>
						{state.errors?.name && (
							<p className="text-sm text-red-500">{state.errors.name[0]}</p>
						)}
					</div>

					{/* ... Resto dos inputs (Email, Status, LTV) ... */}
					{/* A lógica é a mesma para os outros campos */}

					{/* Campo Email */}
					<div className="space-y-2">
						<Label htmlFor="email">E-mail de Contato</Label>
						<Input
							id="email"
							name="email"
							type="email"
							placeholder="contato@exemplo.com"
							defaultValue={clientToEdit?.email || ""}
							className={state.errors?.email ? "border-red-500" : ""}
						/>
						{state.errors?.email && (
							<p className="text-sm text-red-500">{state.errors.email[0]}</p>
						)}
					</div>

					<div className="grid grid-cols-2 gap-4">
						<div className="space-y-2">
							<Label htmlFor="status">Status</Label>
							<Select
								name="status"
								defaultValue={clientToEdit?.status || "Ativo"}
							>
								<SelectTrigger>
									<SelectValue placeholder="Selecione" />
								</SelectTrigger>
								<SelectContent>
									<SelectItem value="Ativo">Ativo</SelectItem>
									<SelectItem value="Pendente">Pendente</SelectItem>
									<SelectItem value="Inativo">Inativo</SelectItem>
								</SelectContent>
							</Select>
						</div>

						<div className="space-y-2">
							<Label htmlFor="ltv">LTV (R$)</Label>
							<Input
								id="ltv"
								name="ltv"
								type="number"
								step="0.01"
								placeholder="0.00"
								defaultValue={clientToEdit?.ltv || ""}
								className={state.errors?.ltv ? "border-red-500" : ""}
							/>
							{state.errors?.ltv && (
								<p className="text-sm text-red-500">{state.errors.ltv[0]}</p>
							)}
						</div>
					</div>

					<DialogFooter>
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
							{clientToEdit ? "Salvar Alterações" : "Criar Cliente"}
						</Button>
					</DialogFooter>
				</form>
			</DialogContent>
		</Dialog>
	)
}
