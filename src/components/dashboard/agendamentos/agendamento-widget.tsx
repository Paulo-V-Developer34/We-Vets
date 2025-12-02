"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { cn } from "@/lib/utils"

// Mock de dados para simular a carga de dias
const days = Array.from({ length: 31 }, (_, i) => ({
	day: i + 1,
	status: i % 7 === 0 ? "cheio" : i % 3 === 0 ? "parcial" : "livre", // logica fake para cores
}))

const timeSlots = [
	{ time: "09:00", status: "Livre" },
	{ time: "11:00", status: "Livre" },
	{ time: "14:00", status: "Livre" },
	{ time: "16:00", status: "Livre" },
]

export function AgendamentoWidget() {
	const [selectedDate, setSelectedDate] = useState<number | null>(2) // Dia 2 selecionado por padrão

	return (
		<div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mt-6">
			{/* Coluna Esquerda: Calendário Visual */}
			<div className="lg:col-span-5 bg-white p-6 rounded-xl shadow-sm border border-slate-100 h-fit">
				{/* Navegação do Mês */}
				<div className="flex items-center justify-between mb-6">
					<Button variant="ghost" size="icon" className="h-8 w-8">
						<ChevronLeft className="h-4 w-4" />
					</Button>
					<span className="font-bold text-lg text-slate-800">Maio • 2026</span>
					<Button variant="ghost" size="icon" className="h-8 w-8">
						<ChevronRight className="h-4 w-4" />
					</Button>
				</div>

				{/* Legenda */}
				<div className="flex justify-center gap-4 mb-6 text-xs text-slate-500">
					<div className="flex items-center gap-1">
						<div className="w-3 h-1 rounded-full bg-emerald-500"></div> Livre
					</div>
					<div className="flex items-center gap-1">
						<div className="w-3 h-1 rounded-full bg-amber-400"></div> Parcial
					</div>
					<div className="flex items-center gap-1">
						<div className="w-3 h-1 rounded-full bg-red-500"></div> Cheio
					</div>
				</div>

				{/* Grid do Calendário */}
				<div className="grid grid-cols-5 sm:grid-cols-7 gap-2">
					{/* Espaços vazios para alinhar dia da semana se necessário */}
					<div className="h-12"></div>
					<div className="h-12"></div>

					{days.map((d) => (
						<button
							key={d.day}
							onClick={() => setSelectedDate(d.day)}
							className={cn(
								"h-14 w-full rounded-lg border flex flex-col items-center justify-center gap-1 transition-all hover:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/20",
								selectedDate === d.day
									? "border-emerald-600 bg-emerald-50 text-emerald-900"
									: "border-slate-100 text-slate-600 bg-white",
							)}
						>
							<span className="text-sm font-medium">{d.day}</span>
							{/* Barrinha de Status */}
							<span
								className={cn(
									"h-1 w-6 rounded-full",
									d.status === "livre" && "bg-emerald-500",
									d.status === "parcial" && "bg-amber-400",
									d.status === "cheio" && "bg-red-500",
								)}
							/>
						</button>
					))}
				</div>
			</div>

			{/* Coluna Direita: Lista de Horários */}
			<div className="lg:col-span-7 bg-white p-6 rounded-xl shadow-sm border border-slate-100 h-fit">
				<h3 className="font-semibold text-lg text-slate-800 mb-6">
					Terça-feira,{" "}
					{selectedDate ? String(selectedDate).padStart(2, "0") : "02"} de
					dezembro
				</h3>

				<div className="space-y-3">
					{timeSlots.map((slot, index) => (
						<div
							key={index}
							className="flex items-center justify-between p-4 rounded-lg border border-slate-100 hover:border-emerald-200 transition-colors bg-white"
						>
							<div>
								<p className="font-bold text-slate-800">{slot.time}</p>
								<p className="text-sm text-slate-500">{slot.status}</p>
							</div>
							<Button className="bg-[#1E7F56] hover:bg-[#166343] text-white px-6">
								Agendar
							</Button>
						</div>
					))}
				</div>

				{/* Placeholder vazio se não houver slots */}
				{timeSlots.length === 0 && (
					<div className="text-center py-10 text-muted-foreground">
						Nenhum horário disponível para esta data.
					</div>
				)}
			</div>
		</div>
	)
}
