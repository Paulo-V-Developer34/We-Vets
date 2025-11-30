"use client"

import { Button } from "@/components/ui/button"
import { Download, Plus } from "lucide-react"

export function Header() {
	return (
		<div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
			<div>
				<h1 className="text-2xl font-bold text-emerald-950">
					Gestão de Clientes
				</h1>
				<p className="text-muted-foreground text-sm">
					Gerencie o relacionamento e histórico dos seus clientes.
				</p>
			</div>
			<div className="flex gap-3">
				<Button variant="outline" className="gap-2 bg-white">
					<Download className="w-4 h-4" />
					Exportar CSV
				</Button>
				<Button className="gap-2 bg-emerald-700 hover:bg-emerald-800 text-white">
					<Plus className="w-4 h-4" />
					Novo Cliente
				</Button>
			</div>
		</div>
	)
}
