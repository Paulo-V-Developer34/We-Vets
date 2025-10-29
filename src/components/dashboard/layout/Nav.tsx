import { PawPrint, Search } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"

export function Header() {
	return (
		<header className="bg-primary text-primary-foreground">
			<div className="container mx-auto flex items-center justify-between">
				{/* Lado Esquerdo: Logo e Nome */}
				<div className="flex items-center gap-3">
					<div className="bg-white/10 p-2 rounded-lg">
						<PawPrint className="h-6 w-6" />
					</div>
					<div>
						<h1 className="text-lg font-bold">WeVet</h1>
						<p className="text-sm text-gray-200">
							Clínica & Gestão Veterinária
						</p>
					</div>
				</div>

				{/* Lado Direito: Ações e Usuário */}
				<div className="flex items-center gap-4">
					<Button
						variant="ghost"
						size="icon"
						className="text-white hover:bg-white/10 hover:text-white rounded-lg"
					>
						<Search className="h-5 w-5" />
					</Button>

					<div className="flex items-center gap-3">
						<Avatar className="h-10 w-10">
							{/* Atualize este 'src' com o caminho para a imagem real do avatar */}
							<AvatarImage src="https://github.com/shadcn.png" alt="Dra. Ana" />
							<AvatarFallback>DA</AvatarFallback>
						</Avatar>
						<div>
							<p className="font-semibold">Dra. Ana</p>
							<p className="text-sm text-gray-200">Clínica Central</p>
						</div>
					</div>
				</div>
			</div>
		</header>
	)
}
