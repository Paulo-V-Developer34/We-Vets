"use client"

import { Button } from "@/components/ui/button"
import {
	Select,
	SelectTrigger,
	SelectValue,
	SelectContent,
	SelectItem,
} from "@/components/ui/select"
import { Download } from "lucide-react"
import { ExportarCSVButton } from "../csv/exportCsv"

export default function ChartHeader({
	content,
}: {
	content: { title: string; text: string }
}) {
	return (
		<div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
			<div>
				<h1 className="text-3xl font-bold tracking-tight text-slate-900">
					{content.title}
				</h1>
				<p className="text-slate-500">{content.text}</p>
			</div>

			<div className="flex items-center gap-2">
				<Select defaultValue="6meses">
					<SelectTrigger className="w-[160px] bg-white">
						<SelectValue placeholder="Período" />
					</SelectTrigger>
					<SelectContent>
						<SelectItem value="7dias">Últimos 7 dias</SelectItem>
						<SelectItem value="30dias">Últimos 30 dias</SelectItem>
						<SelectItem value="6meses">Últimos 6 meses</SelectItem>
					</SelectContent>
				</Select>

				<ExportarCSVButton />
			</div>
		</div>
	)
}
