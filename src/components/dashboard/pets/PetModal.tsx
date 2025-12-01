"use client"

import { useActionState, useEffect, useRef } from "react"
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
import { toast } from "sonner"
import { Loader2, PawPrint } from "lucide-react"
import { FormMessage } from "@/lib/types/message"
// Assumindo que você criou estas actions e tipos:
import { petCreate, petUpdate } from "@/lib/model/pet"
import { PetType } from "@/lib/types/pet"

interface PetModalProps {
	isOpen: boolean
	onClose: () => void
	petToEdit?: PetType | null
	onSuccess?: () => void
}

const initialState: FormMessage = {
	message: "",
	errors: {
		err: [],
	},
	timestamp: 0,
}

export function PetModal({
	isOpen,
	onClose,
	petToEdit,
	onSuccess,
}: PetModalProps) {
	// Actions específicas de Pet
	const [createState, createAction, isCreatePending] = useActionState(
		petCreate,
		initialState,
	)
	const [updateState, updateAction, isUpdatePending] = useActionState(
		petUpdate,
		initialState,
	)

	const isPending = isCreatePending || isUpdatePending

	// Refs de timestamp
	const lastCreateTs = useRef(createState.timestamp)
	const lastUpdateTs = useRef(updateState.timestamp)

	useEffect(() => {
		// Handler de Criação
		if (
			createState.timestamp !== lastCreateTs.current &&
			createState.timestamp !== 0
		) {
			if (createState.errors?.err?.length) {
				toast.error(createState.errors.err[0])
			} else if (createState.message) {
				toast.success("Pet cadastrado com sucesso! 🐶")
				if (onSuccess) onSuccess()
				onClose()
			}
			lastCreateTs.current = createState.timestamp
		}

		// Handler de Atualização
		if (
			updateState.timestamp !== lastUpdateTs.current &&
			updateState.timestamp !== 0
		) {
			if (updateState.errors?.err?.length) {
				toast.error(updateState.errors.err[0])
			} else if (updateState.message) {
				toast.success("Dados do pet atualizados! 🐱")
				if (onSuccess) onSuccess()
				onClose()
			}
			lastUpdateTs.current = updateState.timestamp
		}
	}, [createState, updateState, onClose, onSuccess])

	const currentErrors = petToEdit ? updateState.errors : createState.errors

	return (
		<Dialog open={isOpen} onOpenChange={onClose}>
			<DialogContent className="sm:max-w-[600px]">
				<DialogHeader>
					<DialogTitle className="flex items-center gap-2">
						<PawPrint className="w-5 h-5 text-emerald-600" />
						{petToEdit ? `Editar Pet: ${petToEdit.nome}` : "Cadastrar Novo Pet"}
					</DialogTitle>
					<DialogDescription>
						{petToEdit
							? "Atualize as características físicas ou dados clínicos do animal."
							: "Preencha a ficha cadastral do novo paciente."}
					</DialogDescription>
				</DialogHeader>

				<form
					action={petToEdit ? updateAction : createAction}
					className="space-y-4"
				>
					{petToEdit && <input type="hidden" name="id" value={petToEdit.id} />}

					{/* Nome e Espécie */}
					<div className="grid grid-cols-2 gap-4">
						<div className="space-y-2 col-span-2 sm:col-span-1">
							<Label htmlFor="name">Nome do Pet</Label>
							<Input
								id="name"
								name="name"
								placeholder="Ex: Rex, Mel, Thor"
								defaultValue={petToEdit?.nome || ""}
								className={createState.errors?.err ? "border-red-500" : ""}
							/>
						</div>

						<div className="space-y-2 col-span-2 sm:col-span-1">
							<Label htmlFor="species">Espécie</Label>
							<Select
								name="species"
								defaultValue={petToEdit?.especie || "Cachorro"}
							>
								<SelectTrigger>
									<SelectValue placeholder="Selecione" />
								</SelectTrigger>
								<SelectContent>
									<SelectItem value="Cachorro">Cachorro</SelectItem>
									<SelectItem value="Gato">Gato</SelectItem>
									<SelectItem value="Ave">Ave</SelectItem>
									<SelectItem value="Roedor">Roedor</SelectItem>
									<SelectItem value="Outro">Outro</SelectItem>
								</SelectContent>
							</Select>
						</div>
					</div>

					{/* Raça, Idade e Peso */}
					<div className="grid grid-cols-3 gap-4">
						<div className="space-y-2 col-span-3 sm:col-span-1">
							<Label htmlFor="breed">Raça</Label>
							<Input
								id="breed"
								name="breed"
								placeholder="Ex: Vira-lata"
								defaultValue={petToEdit?.raca || ""}
							/>
						</div>

						<div className="space-y-2 col-span-3 sm:col-span-1">
							<Label htmlFor="age">Idade (Anos)</Label>
							<Input
								id="age"
								name="age"
								type="number"
								placeholder="Ex: 5"
								defaultValue={petToEdit?.age || ""}
							/>
						</div>

						<div className="space-y-2 col-span-3 sm:col-span-1">
							<Label htmlFor="weight">Peso (kg)</Label>
							<Input
								id="weight"
								name="weight"
								type="number"
								step="0.1"
								placeholder="Ex: 12.5"
								defaultValue={petToEdit?.weight || ""}
							/>
						</div>
					</div>

					{/* Foto */}
					<div className="space-y-2">
						<Label htmlFor="image">Foto do Pet (URL)</Label>
						<Input
							id="image"
							name="image"
							type="text"
							placeholder="https://..."
							defaultValue={petToEdit?.image || ""}
						/>
					</div>

					{/* Caso precise vincular a um dono na criação */}
					{!petToEdit && (
						<div className="space-y-2">
							<Label htmlFor="ownerId">
								ID do Tutor (Opcional se já no contexto)
							</Label>
							<Input id="ownerId" name="ownerId" placeholder="UUID do dono" />
						</div>
					)}

					<DialogFooter className="gap-2 sm:gap-0">
						{currentErrors?.err && (
							<p className="text-sm text-red-500 flex items-center mr-auto">
								⚠️ {currentErrors.err[0]}
							</p>
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
							className="bg-emerald-600 hover:bg-emerald-700 text-white gap-2"
							disabled={isPending}
						>
							{isPending ? (
								<Loader2 className="h-4 w-4 animate-spin" />
							) : (
								<PawPrint className="h-4 w-4" />
							)}
							{petToEdit ? "Salvar Pet" : "Cadastrar Pet"}
						</Button>
					</DialogFooter>
				</form>
			</DialogContent>
		</Dialog>
	)
}
