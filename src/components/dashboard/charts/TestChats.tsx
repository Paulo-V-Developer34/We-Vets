"use client"

import {
	Download,
	TrendingUp,
	Users,
	Package,
	CalendarCheck,
	DollarSign,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import {
	Card,
	CardContent,
	CardHeader,
	CardTitle,
	CardDescription,
} from "@/components/ui/card"
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select"
import {
	AreaChart,
	Area,
	XAxis,
	YAxis,
	CartesianGrid,
	Tooltip,
	ResponsiveContainer,
	BarChart,
	Bar,
	Cell,
} from "recharts"

// Interfaces reutilizáveis
export interface KPIData {
	receitaTotal: number
	ticketMedio: number
	agendamentosTotal: number
	agendamentosConfirmados: number
	produtosEstoque: number
	produtosAlerta: number
	pacientesAtivos: number
	ultimaAtualizacaoPacientes: string
}

export interface ChartDataReceita {
	name: string
	valor: number
}

export interface ChartDataAtendimento {
	name: string
	valor: number
}

export interface DashboardData {
	kpis: KPIData
	graficoReceita: ChartDataReceita[]
	graficoAtendimentos: ChartDataAtendimento[]
}

export default function DashboardView({ data }: { data: DashboardData }) {
	return (
		<div className="space-y-6 animate-in fade-in duration-500">
			{/* Header */}
			<div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
				<div>
					<h1 className="text-3xl font-bold tracking-tight text-slate-900">
						Dashboard
					</h1>
					<p className="text-slate-500">
						Indicadores clínicos, próximos atendimentos e controle rápido do
						estoque.
					</p>
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

					<Button className="bg-emerald-800 hover:bg-emerald-900 text-white gap-2">
						<Download className="h-4 w-4" />
						Exportar CSV
					</Button>
				</div>
			</div>

			{/* Grid de KPIs */}
			<div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
				<Card className="border-l-4 border-l-emerald-600 shadow-sm">
					<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
						<CardTitle className="text-sm font-medium text-slate-600">
							Receita (30d)
						</CardTitle>
						<DollarSign className="h-4 w-4 text-emerald-600" />
					</CardHeader>
					<CardContent>
						<div className="text-2xl font-bold text-slate-900">
							{new Intl.NumberFormat("pt-BR", {
								style: "currency",
								currency: "BRL",
							}).format(data.kpis.receitaTotal)}
						</div>
						<p className="text-xs text-slate-500 mt-1">
							Ticket médio:{" "}
							<span className="font-medium text-emerald-700">
								{new Intl.NumberFormat("pt-BR", {
									style: "currency",
									currency: "BRL",
								}).format(data.kpis.ticketMedio)}
							</span>
						</p>
					</CardContent>
				</Card>

				<Card className="shadow-sm">
					<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
						<CardTitle className="text-sm font-medium text-slate-600">
							Agendamentos (7d)
						</CardTitle>
						<CalendarCheck className="h-4 w-4 text-emerald-600" />
					</CardHeader>
					<CardContent>
						<div className="text-2xl font-bold text-slate-900">
							{data.kpis.agendamentosTotal}
						</div>
						<p className="text-xs text-slate-500 mt-1">
							Confirmados:{" "}
							<span className="font-medium text-emerald-700">
								{data.kpis.agendamentosConfirmados}
							</span>
						</p>
					</CardContent>
				</Card>

				<Card className="shadow-sm">
					<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
						<CardTitle className="text-sm font-medium text-slate-600">
							Produtos em estoque
						</CardTitle>
						<Package className="h-4 w-4 text-emerald-600" />
					</CardHeader>
					<CardContent>
						<div className="text-2xl font-bold text-slate-900">
							{data.kpis.produtosEstoque}
						</div>
						<p className="text-xs text-slate-500 mt-1">
							Com alerta:{" "}
							<span className="font-medium text-red-600">
								{data.kpis.produtosAlerta}
							</span>
						</p>
					</CardContent>
				</Card>

				<Card className="border-r-4 border-r-emerald-600 shadow-sm">
					<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
						<CardTitle className="text-sm font-medium text-slate-600">
							Pacientes ativos
						</CardTitle>
						<Users className="h-4 w-4 text-emerald-600" />
					</CardHeader>
					<CardContent>
						<div className="text-2xl font-bold text-slate-900">
							{data.kpis.pacientesAtivos}
						</div>
						<p className="text-xs text-slate-500 mt-1">
							Últ. cadastro: {data.kpis.ultimaAtualizacaoPacientes}
						</p>
					</CardContent>
				</Card>
			</div>

			{/* Gráficos */}
			<div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
				{/* Gráfico de Receita */}
				<Card className="col-span-4 shadow-sm">
					<CardHeader>
						<CardTitle className="text-lg text-slate-800 flex items-center gap-2">
							<TrendingUp className="h-5 w-5 text-emerald-600" />
							Receita / Vendas
						</CardTitle>
						<CardDescription>
							Receita mensal com destaque para picos e sazonalidade.
						</CardDescription>
					</CardHeader>
					<CardContent className="pl-0">
						<div className="h-[300px] w-full">
							<ResponsiveContainer width="100%" height="100%">
								<AreaChart
									data={data.graficoReceita}
									margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
								>
									<defs>
										<linearGradient
											id="colorReceita"
											x1="0"
											y1="0"
											x2="0"
											y2="1"
										>
											<stop offset="5%" stopColor="#10b981" stopOpacity={0.2} />
											<stop offset="95%" stopColor="#10b981" stopOpacity={0} />
										</linearGradient>
									</defs>
									<CartesianGrid
										strokeDasharray="3 3"
										vertical={false}
										stroke="#e2e8f0"
									/>
									<XAxis
										dataKey="name"
										axisLine={false}
										tickLine={false}
										tick={{ fill: "#64748b", fontSize: 12 }}
										dy={10}
									/>
									<YAxis
										axisLine={false}
										tickLine={false}
										tick={{ fill: "#64748b", fontSize: 12 }}
										tickFormatter={(value) => `R$ ${value}`}
									/>
									<Tooltip
										contentStyle={{
											borderRadius: "8px",
											border: "none",
											boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1)",
										}}
										cursor={{ stroke: "#10b981", strokeWidth: 1 }}
										formatter={(value: number) =>
											new Intl.NumberFormat("pt-BR", {
												style: "currency",
												currency: "BRL",
											}).format(value)
										}
									/>
									<Area
										type="monotone"
										dataKey="valor"
										stroke="#059669"
										strokeWidth={2}
										fillOpacity={1}
										fill="url(#colorReceita)"
									/>
								</AreaChart>
							</ResponsiveContainer>
						</div>
					</CardContent>
				</Card>

				{/* Gráfico de Atendimentos */}
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
								<BarChart
									data={data.graficoAtendimentos}
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
										{data.graficoAtendimentos.map((entry, index) => (
											<Cell key={`cell-${index}`} fill="#15803d" />
										))}
									</Bar>
								</BarChart>
							</ResponsiveContainer>
						</div>
					</CardContent>
				</Card>
			</div>
		</div>
	)
}
