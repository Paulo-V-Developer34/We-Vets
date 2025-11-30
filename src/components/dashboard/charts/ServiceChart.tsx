"use client"

import {
	Card,
	CardHeader,
	CardTitle,
	CardDescription,
	CardContent,
} from "@/components/ui/card"
import { Atendimento } from "@/lib/types/charts"
import { Users } from "lucide-react"
import {
	ResponsiveContainer,
	CartesianGrid,
	XAxis,
	YAxis,
	Tooltip,
	Bar,
	Cell,
	BarChart,
} from "recharts"

export default function ChartService({
	dataAtendimentos,
}: {
	dataAtendimentos: Atendimento[]
}) {
	return (
		<Card className="col-span-3 shadow-sm">
			<CardHeader>
				<CardTitle className="text-lg text-slate-800 flex items-center gap-2">
					<Users className="h-5 w-5 text-emerald-600" />
					Atendimentos por tipo
				</CardTitle>
				<CardDescription>
					Distribuição dos serviços no período filtrado.
				</CardDescription>
			</CardHeader>
			<CardContent>
				<div className="h-[300px] w-full">
					<ResponsiveContainer width="100%" height="100%">
						{/* <BarChart
									data={dataAtendimentos}
									layout="vertical"
									margin={{ top: 0, right: 0, left: 40, bottom: 0 }}
								> */}
						{/* Layout vertical para acomodar melhor os nomes se a tela for pequena, 
                                    mas na imagem é vertical normal. Vou ajustar para ficar idêntico à imagem (colunas verticais) */}
						{/* </BarChart> */}
						{/* Correção: Voltando para layout horizontal (padrão) conforme imagem */}
						<BarChart
							data={dataAtendimentos}
							margin={{ top: 0, right: 0, left: -20, bottom: 0 }}
						>
							<CartesianGrid
								strokeDasharray="3 3"
								vertical={false}
								stroke="#e2e8f0"
							/>
							<XAxis
								dataKey="name"
								axisLine={false}
								tickLine={false}
								tick={{ fill: "#64748b", fontSize: 11 }}
								interval={0}
								dy={10}
							/>
							<YAxis
								axisLine={false}
								tickLine={false}
								tick={{ fill: "#64748b", fontSize: 12 }}
							/>
							<Tooltip
								cursor={{ fill: "#f1f5f9" }}
								contentStyle={{ borderRadius: "8px", border: "none" }}
							/>
							<Bar dataKey="valor" radius={[4, 4, 0, 0]}>
								{dataAtendimentos.map((entry, index) => (
									<Cell key={`cell-${index}`} fill="#15803d" />
								))}
							</Bar>
						</BarChart>
					</ResponsiveContainer>
				</div>
			</CardContent>
		</Card>
	)
}
