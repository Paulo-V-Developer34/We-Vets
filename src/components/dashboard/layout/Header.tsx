import { Bell, PawPrint } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"

export function Header() {
	return (
		<header className="flex h-16 w-full items-center justify-between bg-emerald-950 px-6 text-white shadow-md">
			{/* Lado Esquerdo: Logo e Nome da Clínica */}
			<div className="flex items-center gap-3">
				<div className="flex h-10 w-10 items-center justify-center rounded-full bg-emerald-100/10">
					<PawPrint className="h-6 w-6 text-emerald-400" />
				</div>
				<div className="flex flex-col">
					<span className="text-lg font-bold leading-tight">WeVet</span>
					<span className="text-xs font-light text-emerald-200">
						Clínica & Gestão Veterinária
					</span>
				</div>
			</div>

			{/* Lado Direito: Notificações e Perfil */}
			<div className="flex items-center gap-4">
				<Button
					variant="ghost"
					size="icon"
					className="text-white hover:bg-emerald-900 hover:text-white relative"
				>
					<Bell className="h-5 w-5" />
					<span className="absolute top-2 right-2 h-2 w-2 rounded-full bg-yellow-400" />
				</Button>

				<div className="flex items-center gap-3 pl-4 border-l border-emerald-800">
					<Avatar className="h-9 w-9 border-2 border-emerald-700">
						<AvatarImage src="https://github.com/shadcn.png" alt="Dra. Ana" />
						<AvatarFallback>DA</AvatarFallback>
					</Avatar>
					<div className="flex-col text-right hidden sm:flex">
						<span className="text-sm font-medium">Dra. Ana</span>
						<span className="text-xs text-emerald-200">Clínica Central</span>
					</div>
				</div>
			</div>
		</header>
	)
}
