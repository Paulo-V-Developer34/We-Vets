"use client" // 1. Indica que este é um componente que roda no navegador

import Link from "next/link"
import { usePathname, useRouter } from "next/navigation" // 2. Hook para pegar a rota atual
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
	BookUp2,
	Coins,
	LucideLayoutDashboard,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { signOut } from "next-auth/react"
import { MenuItem } from "@/lib/types/menu"
import { Role } from "../../../../generated/prisma"

// Removemos o 'active: true' hardcoded, pois agora será dinâmico
const menuItems = [
	{
		icon: LayoutDashboard,
		label: "Dashboard",
		href: "/home",
		admOnly: true,
	},
	{
		icon: CalendarDays,
		label: "Agendamentos",
		href: "/agendamentos",
		admOnly: false,
	},
	{ icon: Users, label: "Clientes", href: "/clientes", admOnly: true },
	{ icon: Dog, label: "Pets", href: "/pets", admOnly: false },
	{ icon: Package, label: "Estoque", href: "/estoque", admOnly: true },
	{ icon: BarChart3, label: "Relatórios", href: "/relatorios", admOnly: true },
	{
		icon: BookUp2,
		label: "Razão",
		href: "/razao",
		admOnly: true,
	},
	{
		icon: Coins,
		label: "DRE",
		href: "/dre",
		admOnly: true,
	},
	{
		icon: LucideLayoutDashboard,
		label: "Balanço",
		href: "/balanco",
		admOnly: true,
	},
	{
		icon: Settings,
		label: "Configurações",
		href: "/configuracoes",
		admOnly: false,
	},
]

export function Sidebar({ role }: { role: Role }) {
	const pathname = usePathname() // Pega a URL atual (ex: "/estoque")
	const router = useRouter()
	if (!role) {
		router.replace("/signin")
	}

	return (
		<aside className="flex w-64 flex-col justify-between border-r bg-white px-4 py-6">
			<nav className="flex flex-col gap-2">
				{menuItems.map((item) => {
					// Verifica se o path atual é igual ao href do item
					// Dica: Se quiser que sub-rotas (ex: /estoque/novo) também ativem o botão,
					// use: const isActive = pathname.startsWith(item.href);
					const isActive = pathname === `/dashboard${item.href}`

					if (item.admOnly === true && role != "VETERINARIO") {
						if (item.admOnly === true && role != "ADMIN") {
							return null
						}
					}
					return (
						<Link
							key={item.label}
							href={`/dashboard${item.href}`}
							className={`
                flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors
                ${
									isActive
										? "bg-emerald-50 text-emerald-900" // Estilo Ativo (Verde)
										: "text-slate-600 hover:bg-slate-100 hover:text-slate-900" // Estilo Inativo (Cinza + Hover escuro)
								}
              `}
						>
							<item.icon
								className={`h-5 w-5 ${isActive ? "text-emerald-600" : "text-slate-500"}`}
							/>
							{item.label}
						</Link>
					)
				})}
			</nav>

			{/* Rodapé do Sidebar */}
			<div className="mt-auto flex flex-col gap-4 border-t pt-6">
				<div className="flex items-center gap-3 rounded-lg p-2 bg-slate-50 border border-slate-100">
					<div className="flex h-8 w-8 items-center justify-center rounded bg-emerald-600 text-white">
						<Home className="h-4 w-4" />
					</div>
					{/* Correção do erro de flex/hidden anterior aplicada aqui também */}
					<div className="hidden flex-col overflow-hidden sm:flex">
						<span className="truncate text-sm font-medium text-slate-900">
							Dra. Ana
						</span>
						<span className="truncate text-xs text-slate-500">
							Clínica Central
						</span>
					</div>
				</div>

				<Button
					onClick={() => signOut()}
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
