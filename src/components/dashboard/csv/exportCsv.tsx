// components/ExportarCSVButton.tsx
"use client"

import { useState } from "react"

export function ExportarCSVButton() {
	const [loading, setLoading] = useState(false)

	const handleExport = async () => {
		try {
			setLoading(true)

			const response = await fetch("/api/fatos-financeiros/export")

			if (!response.ok) {
				throw new Error("Erro ao exportar CSV")
			}

			// Criar um blob com o conteúdo do CSV
			const blob = await response.blob()

			// Criar uma URL temporária para o blob
			const url = window.URL.createObjectURL(blob)

			// Criar um link invisível e clicar nele para iniciar o download
			const link = document.createElement("a")
			link.href = url
			link.download = `fatos-financeiros-${new Date().toISOString().split("T")[0]}.csv`
			document.body.appendChild(link)
			link.click()

			// Limpar
			document.body.removeChild(link)
			window.URL.revokeObjectURL(url)
		} catch (error) {
			console.error("Erro ao exportar:", error)
			alert("Erro ao exportar CSV. Tente novamente.")
		} finally {
			setLoading(false)
		}
	}

	return (
		<button
			onClick={handleExport}
			disabled={loading}
			className="px-4 py-2 bg-emerald-800 text-white rounded hover:bg-emerald-900 disabled:opacity-50"
		>
			{loading ? "Exportando..." : "Exportar CSV"}
		</button>
	)
}
