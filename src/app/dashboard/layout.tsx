import type { Metadata } from "next"
import { Inter } from "next/font/google"
import { Header } from "@/components/dashboard/layout/Header"
import { Sidebar } from "@/components/dashboard/layout/SideBar"
import { auth } from "@/lib/auth/auth"
import { redirect } from "next/navigation"
// import { Suspense } from "react"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
	title: "WeVet - Gestão Veterinária",
	description: "Sistema de gestão para clínicas veterinárias",
}

export default async function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode
}>) {
	const session = await auth()
	if (!session?.user) {
		redirect("/signin")
	}

	return (
		// <Suspense fallback={<div>Loading...</div>}>
		<div className={`${inter.className} min-h-screen bg-slate-50`}>
			{/* Wrapper Principal: Flex Coluna (Header em cima, resto embaixo) */}
			<div className="flex min-h-screen flex-col">
				{/* Header Fixo no topo da estrutura visual */}
				<Header user={session} />

				{/* Área de Conteúdo: Sidebar + Main */}
				<div className="flex flex-1">
					{/* Sidebar Fixa à esquerda */}
					<Sidebar role={session.user.role} />

					{/* Conteúdo da Página (Page) */}
					<main className="flex-1 overflow-y-auto p-8 bg-slate-50/50">
						{children}
					</main>
				</div>
			</div>
		</div>
		// </Suspense>
	)
}
