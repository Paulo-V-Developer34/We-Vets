import type { Metadata } from "next"
import { Inter } from "next/font/google"
import { Header } from "@/components/dashboard/layout/Header"
import { Sidebar } from "@/components/dashboard/layout/SideBar"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
	title: "WeVet - Gestão Veterinária",
	description: "Sistema de gestão para clínicas veterinárias",
}

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode
}>) {
	return (
		<html lang="pt-BR">
			<body className={`${inter.className} min-h-screen bg-slate-50`}>
				{/* Wrapper Principal: Flex Coluna (Header em cima, resto embaixo) */}
				<div className="flex min-h-screen flex-col">
					{/* Header Fixo no topo da estrutura visual */}
					<Header />

					{/* Área de Conteúdo: Sidebar + Main */}
					<div className="flex flex-1">
						{/* Sidebar Fixa à esquerda */}
						<Sidebar />

						{/* Conteúdo da Página (Page) */}
						<main className="flex-1 overflow-y-auto p-8 bg-slate-50/50">
							{children}
						</main>
					</div>
				</div>
			</body>
		</html>
	)
}
