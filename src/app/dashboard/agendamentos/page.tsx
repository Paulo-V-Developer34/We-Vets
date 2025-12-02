import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"
import { AgendamentoWidget } from "@/components/dashboard/agendamentos/agendamento-widget"

// Função auxiliar para os KPIs (sem alterações de lógica)
function KPICard({
	title,
	value,
	subtext,
}: {
	title: string
	value: string
	subtext: string
}) {
	return (
		<div className="bg-white rounded-lg shadow-sm border border-slate-100 p-4 flex flex-col justify-between relative overflow-hidden h-full">
			<div className="absolute left-0 top-0 bottom-0 w-1.5 bg-[#1E7F56]"></div>
			<div className="ml-2 space-y-1">
				<h3 className="text-xs font-semibold text-slate-500 uppercase tracking-wide">
					{title}
				</h3>
				<div className="text-2xl font-bold text-slate-900">{value}</div>
				<p className="text-[10px] text-slate-400">{subtext}</p>
			</div>
		</div>
	)
}

export default function AgendamentosPage() {
	return (
		// FIX 1: h-[calc(100vh-2rem)] força a altura exata da tela menos o padding
		// FIX 2: overflow-hidden impede scroll
		<div className="h-[calc(100vh-1rem)] flex flex-col gap-4 p-6 overflow-hidden bg-slate-50/50">
			{/* Header - Altura fixa (shrink-0 impede de encolher) */}
			<div className="flex flex-shrink-0 items-center justify-between">
				<div>
					<h1 className="text-2xl font-bold text-slate-900">Agendamentos</h1>
					<p className="text-sm text-slate-500">
						Gerencie consultas e vacinas.
					</p>
				</div>
				<Button
					size="sm"
					className="bg-[#1E7F56] hover:bg-[#166343] text-white shadow-sm"
				>
					<Plus className="mr-2 h-4 w-4" /> Novo agendamento
				</Button>
			</div>

			{/* KPI Section - Altura fixa */}
			<div className="flex-shrink-0 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4 h-24">
				<KPICard
					title="Agendamentos (30d)"
					value="124"
					subtext="Média diária: 4"
				/>
				<KPICard
					title="Agendamentos (7d)"
					value="34"
					subtext="Confirmados: 28"
				/>
				<KPICard title="Cancelamentos" value="12" subtext="Reagendados: 5" />
				<KPICard title="Atendidos" value="58" subtext="Último: Hoje" />
			</div>

			{/* Interactive Client Section - flex-1 faz ele ocupar TODO o resto do espaço */}
			<div className="flex-1 min-h-0">
				<AgendamentoWidget />
			</div>
		</div>
	)
}
