"use client"

import { Card, CardContent } from "@/components/ui/card"
import {
	Area,
	AreaChart,
	CartesianGrid,
	ResponsiveContainer,
	Tooltip,
	XAxis,
} from "recharts"
import {
	TrendingUp,
	FileText,
	Activity,
	DollarSign,
	Calendar,
} from "lucide-react"

// Dados simulados para o gráfico
const chartData = [
	{ date: "02/10", value: 1200 },
	{ date: "04/10", value: 1300 },
	{ date: "06/10", value: 1800 },
	{ date: "10/10", value: 1600 },
	{ date: "13/10", value: 2800 },
	{ date: "15/10", value: 2400 },
	{ date: "19/10", value: 2500 },
	{ date: "23/10", value: 2600 },
]

const accountsSummary = [
	{ label: "Estoque", count: "2x", value: 3210.0 },
	{ label: "Despesas", count: "3x", value: 1820.0 },
	{ label: "Caixa", count: "6x", value: 1350.0 },
	{ label: "Receitas", count: "5x", value: -1550.0 },
	{ label: "Banco", count: "4x", value: -4830.0 },
]

export function Dashboard() {
	return (
		<div className="space-y-6">
			{/* KPI Cards */}
			<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
				<KPICard title="Contas" value="5" sub="Total de contas cadastradas" />
				<KPICard
					title="Movimentações"
					value="10"
					sub="Lançamentos realizados"
				/>
				<KPICard
					title="Saldo Geral"
					value="R$ -3.480,00"
					sub="Somatório das contas"
					highlight
				/>
				<KPICard
					title="Saldo médio (dias exib.)"
					value="R$ 1.887,00"
					sub="Média diária exibida"
				/>
			</div>

			{/* Main Chart Section */}
			<Card className="p-6">
				<div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
					{/* Left Side: Accounts List */}
					<div className="lg:col-span-1 space-y-6">
						{accountsSummary.map((acc, i) => (
							<div
								key={i}
								className="flex items-center justify-between group cursor-pointer hover:bg-gray-50 p-2 rounded-md transition-colors"
							>
								<div className="flex items-center gap-3">
									<div className="bg-emerald-100 text-emerald-700 font-bold px-2 py-1 rounded text-xs">
										{acc.count}
									</div>
									<div>
										<p className="font-bold text-sm text-gray-800">
											{acc.label}
										</p>
										<p className="text-xs text-gray-500">
											{parseInt(acc.count)} lançamentos
										</p>
									</div>
								</div>
								<div className="text-right">
									{/* Mini sparkline fake usando div apenas para visual */}
									<div className="h-1 w-12 bg-emerald-200 rounded-full mb-1 ml-auto"></div>
									<p className="font-bold text-sm text-emerald-900">
										R${" "}
										{acc.value.toLocaleString("pt-BR", {
											minimumFractionDigits: 2,
										})}
									</p>
								</div>
							</div>
						))}
					</div>

					{/* Right Side: Big Chart */}
					<div className="lg:col-span-2 flex flex-col justify-between h-[400px]">
						<div className="flex justify-between items-start mb-4">
							<div>
								<h3 className="text-gray-500 text-sm font-medium">
									Todas as Contas
								</h3>
								<p className="text-gray-400 text-xs">Soma e tendência</p>
							</div>
							<div className="flex gap-2">
								{/* Botões decorativos de controle do gráfico */}
								<button className="p-1 hover:bg-gray-100 rounded">
									<FileText className="w-4 h-4 text-gray-500" />
								</button>
								<button className="p-1 hover:bg-gray-100 rounded">
									<Activity className="w-4 h-4 text-gray-500" />
								</button>
							</div>
						</div>

						<div className="flex-1 w-full min-h-0">
							<ResponsiveContainer width="100%" height="100%">
								<AreaChart data={chartData}>
									<defs>
										<linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
											<stop offset="5%" stopColor="#10b981" stopOpacity={0.2} />
											<stop offset="95%" stopColor="#10b981" stopOpacity={0} />
										</linearGradient>
									</defs>
									<CartesianGrid
										vertical={false}
										strokeDasharray="3 3"
										stroke="#e5e7eb"
									/>
									<XAxis
										dataKey="date"
										axisLine={false}
										tickLine={false}
										tick={{ fill: "#6b7280", fontSize: 12 }}
										dy={10}
									/>
									<Tooltip
										contentStyle={{
											borderRadius: "8px",
											border: "none",
											boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1)",
										}}
									/>
									<Area
										type="monotone"
										dataKey="value"
										stroke="#10b981"
										strokeWidth={2}
										fillOpacity={1}
										fill="url(#colorValue)"
									/>
								</AreaChart>
							</ResponsiveContainer>
						</div>

						{/* Chart Footer Metrics */}
						<div className="flex gap-8 mt-4 pt-4 border-t border-gray-100">
							<div>
								<p className="text-xs text-gray-500">Último Saldo</p>
								<p className="font-bold text-gray-800">R$ -3.480,00</p>
							</div>
							<div>
								<p className="text-xs text-gray-500">Variação (Mês)</p>
								<p className="font-bold text-gray-800">0%</p>
							</div>
							<div>
								<p className="text-xs text-gray-500">Maior Movimento</p>
								<p className="font-bold text-gray-800">R$ 2.800,00</p>
							</div>
						</div>
					</div>
				</div>
			</Card>
		</div>
	)
}

// Componente Auxiliar para os Cards do Topo
function KPICard({
	title,
	value,
	sub,
	highlight = false,
}: {
	title: string
	value: string
	sub: string
	highlight?: boolean
}) {
	return (
		<Card className="shadow-sm border-l-4 border-l-emerald-500">
			<CardContent className="p-5">
				<h3 className="text-sm font-medium text-gray-500 mb-1">{title}</h3>
				<p
					className={`text-2xl font-bold mb-1 ${highlight ? "text-emerald-700" : "text-gray-900"}`}
				>
					{value}
				</p>
				<p className="text-xs text-gray-400">{sub}</p>
			</CardContent>
		</Card>
	)
}
