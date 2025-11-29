"use client" // Componentes de erro precisam ser Client Components

import { useEffect } from "react"
import { Button } from "@/components/ui/button"
import { AlertTriangle, RefreshCcw } from "lucide-react"
import {
	Card,
	CardContent,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card"

export default function Error({
	error,
	reset,
}: {
	error: Error & { digest?: string }
	reset: () => void
}) {
	useEffect(() => {
		// Aqui você poderia enviar o erro para um serviço de log (Sentry, LogRocket, etc.)
		console.error("Erro capturado no Dashboard:", error)
	}, [error])

	return (
		<div className="flex h-[80vh] w-full flex-col items-center justify-center gap-4">
			<Card className="w-full max-w-md border-red-200 shadow-lg">
				<CardHeader className="text-center">
					<div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-red-100">
						<AlertTriangle className="h-6 w-6 text-red-600" />
					</div>
					<CardTitle className="text-xl text-slate-900">
						Ops! Algo deu errado.
					</CardTitle>
				</CardHeader>

				<CardContent className="text-center">
					<p className="text-sm text-slate-500 mb-2">
						Não foi possível carregar os dados do dashboard. Isso pode ser uma
						falha temporária de conexão ou um erro no servidor.
					</p>
					{/* Mostra mensagem técnica apenas em ambiente de desenvolvimento (opcional) */}
					{process.env.NODE_ENV === "development" && (
						<div className="mt-4 rounded bg-slate-100 p-2 text-xs text-left font-mono text-red-800 overflow-auto max-h-32 border border-slate-200">
							{error.message || "Erro desconhecido"}
						</div>
					)}
				</CardContent>

				<CardFooter className="flex justify-center pb-6">
					<Button
						onClick={reset}
						className="bg-emerald-800 hover:bg-emerald-900 text-white gap-2 w-full sm:w-auto"
					>
						<RefreshCcw className="h-4 w-4" />
						Tentar novamente
					</Button>
				</CardFooter>
			</Card>
		</div>
	)
}
