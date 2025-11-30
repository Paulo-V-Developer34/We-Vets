import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"

export default function DashboardLoading() {
	return (
		<div className="space-y-6">
			{/* Header Skeleton */}
			<div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
				<div>
					<Skeleton className="h-8 w-48 mb-2 bg-slate-200" /> {/* Título */}
					<Skeleton className="h-4 w-96 bg-slate-100" /> {/* Descrição */}
				</div>
				<div className="flex items-center gap-2">
					<Skeleton className="h-10 w-[160px] bg-slate-100" /> {/* Select */}
					<Skeleton className="h-10 w-32 bg-slate-200" /> {/* Botão */}
				</div>
			</div>

			{/* Grid de KPIs Skeleton */}
			<div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
				{Array.from({ length: 4 }).map((_, i) => (
					<Card key={i} className="shadow-sm">
						<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
							<Skeleton className="h-4 w-24 bg-slate-200" />
							<Skeleton className="h-4 w-4 rounded-full bg-slate-200" />
						</CardHeader>
						<CardContent>
							<Skeleton className="h-8 w-32 mb-1 bg-slate-100" />
							<Skeleton className="h-3 w-20 bg-slate-50" />
						</CardContent>
					</Card>
				))}
			</div>

			{/* Gráficos Skeleton */}
			<div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
				<Card className="col-span-4 shadow-sm">
					<CardHeader>
						<Skeleton className="h-6 w-48 mb-2 bg-slate-200" />
						<Skeleton className="h-4 w-64 bg-slate-100" />
					</CardHeader>
					<CardContent>
						<Skeleton className="h-[300px] w-full bg-slate-100" />
					</CardContent>
				</Card>

				<Card className="col-span-3 shadow-sm">
					<CardHeader>
						<Skeleton className="h-6 w-48 mb-2 bg-slate-200" />
						<Skeleton className="h-4 w-64 bg-slate-100" />
					</CardHeader>
					<CardContent>
						<Skeleton className="h-[300px] w-full bg-slate-100" />
					</CardContent>
				</Card>
			</div>
		</div>
	)
}
