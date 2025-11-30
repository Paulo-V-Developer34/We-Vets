import type { Metadata } from "next"
import { Geist, Geist_Mono } from "next/font/google"
import "./globals.css"
import { Toaster } from "sonner"

const geistSans = Geist({
	variable: "--font-geist-sans",
	subsets: ["latin"],
})

const geistMono = Geist_Mono({
	variable: "--font-geist-mono",
	subsets: ["latin"],
})

export const metadata: Metadata = {
	title: "We Vets",
	description: "Site de gerenciamento de clínicas veterinárias",
	icons: {
		icon: "/favicon.png",
	},
}

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode
}>) {
	return (
		<html lang="en">
			<body
				className={`${geistSans.variable} ${geistMono.variable} antialiased`}
			>
				{children}
				<Toaster
					richColors // Ativa cores automáticas (verde para sucesso, vermelho para erro)
					position="bottom-center"
					expand={true} // Dá um efeito visual legal de "pilha"
					toastOptions={{
						// Estilos globais para TODOS os toasts
						className:
							"p-6 gap-4 min-w-[400px] shadow-xl border-l-8 rounded-lg",

						// Estilização específica por tipo
						classNames: {
							success:
								"bg-emerald-50 border-emerald-600 text-emerald-900 shadow-emerald-100",
							error: "bg-red-50 border-red-600 text-red-900 shadow-red-100",
							info: "bg-blue-50 border-blue-600 text-blue-900",

							// Aumentando fontes
							title: "text-lg font-bold tracking-tight",
							description: "text-base text-slate-600 font-medium",
							actionButton: "bg-emerald-600 text-white p-3 font-bold text-sm",
							cancelButton: "bg-slate-200 text-slate-600 p-3 font-bold text-sm",
						},
					}}
				/>
			</body>
		</html>
	)
}
