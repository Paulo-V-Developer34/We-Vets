// app/loading.tsx (ou app/dashboard/loading.tsx)
export default function Loading() {
	return (
		<div className="flex h-screen w-full items-center justify-center bg-slate-50">
			<div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-700" />
		</div>
	)
}
