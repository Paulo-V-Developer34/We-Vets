"use client"
import { Button } from "@/components/ui/button"
import { deletarBanco } from "@/lib/model/data"
import { useActionState } from "react"
import { toast } from "sonner"

export default function BotaoDaDestruicao() {
	const [state, action] = useActionState(deletarBanco, null)
	const handleDeletar = async () => {
		// Para deletar via Server Action, você criaria uma action similar à de salvar
		await action()

		if (state?.errors) {
			toast.error(state?.errors.err[0])
			// aqui você pode atualizar o estado ou refazer um fetch
		} else {
			toast.success("Banco deletado com sucesso")
		}
	}
	return (
		<Button
			variant="destructive"
			className="h-30 px-16 text-3xl font-bold uppercase shadow-lg hover:shadow-xl transition-shadow"
			onClick={() => handleDeletar()}
		>
			APAGAR BANCO DE DADOS
		</Button>
	)
}
