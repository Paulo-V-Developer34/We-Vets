import Link from "next/link"
import {
	LayoutDashboard,
	CalendarDays,
	Users,
	Dog,
	Package,
	BarChart3,
	Settings,
	LogOut,
	Home,
} from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"

// Lista de itens do menu para manter o código limpo
const menuItems = [
	{
		icon: LayoutDashboard,
		label: "Dashboard",
		href: "/dashboard",
		active: true,
	},
	{ icon: CalendarDays, label: "Agendamentos", href: "/agendamentos" },
	{ icon: Users, label: "Clientes", href: "/clientes" },
	{ icon: Dog, label: "Pacientes", href: "/pacientes" },
	{ icon: Package, label: "Estoque", href: "/estoque" },
	{ icon: BarChart3, label: "Relatórios", href: "/relatorios" },
	{ icon: Settings, label: "Configurações", href: "/configuracoes" },
]

export function Sidebar() {
	return (
		<aside className="flex w-64 flex-col justify-between border-r bg-white px-4 py-6">
			{/* Navegação Principal */}
			<nav className="flex flex-col gap-2">
				{menuItems.map((item) => (
					<Link
						key={item.label}
						href={item.href}
						className={`
              flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors
              ${
								item.active
									? "bg-emerald-50 text-emerald-900" // Estilo Ativo
									: "text-slate-600 hover:bg-slate-100 hover:text-slate-900" // Estilo Normal + Hover Escuro
							}
            `}
					>
						<item.icon
							className={`h-5 w-5 ${item.active ? "text-emerald-600" : "text-slate-500"}`}
						/>
						{item.label}
					</Link>
				))}
			</nav>

			{/* Rodapé do Sidebar: Perfil + Logout */}
			<div className="mt-auto flex flex-col gap-4 border-t pt-6">
				<div className="flex items-center gap-3 rounded-lg p-2 bg-slate-50 border border-slate-100">
					<div className="flex h-8 w-8 items-center justify-center rounded bg-emerald-600 text-white">
						<Home className="h-4 w-4" />
					</div>
					<div className="flex flex-col overflow-hidden">
						<span className="truncate text-sm font-medium text-slate-900">
							Dra. Ana
						</span>
						<span className="truncate text-xs text-slate-500">
							Clínica Central
						</span>
					</div>
				</div>

				<Button
					variant="ghost"
					className="justify-start gap-3 text-red-600 hover:bg-red-50 hover:text-red-700"
				>
					<LogOut className="h-5 w-5" />
					Sair
				</Button>
			</div>
		</aside>
	)
}
