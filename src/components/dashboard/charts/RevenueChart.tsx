"use client"

import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card"
import { Receita } from "@/lib/types/charts"
import { TrendingUp } from "lucide-react"
import {
	ResponsiveContainer,
	CartesianGrid,
	XAxis,
	YAxis,
	Tooltip,
	Area,
	AreaChart,
} from "recharts"

export default function ChartRevenue({
	dataReceita,
}: {
	dataReceita: Receita[]
}) {
	return (
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
							data={dataReceita}
							margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
						>
							<defs>
								<linearGradient id="colorReceita" x1="0" y1="0" x2="0" y2="1">
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
	)
}
