import { AppSidebar } from "@/components/app-sidebar"
import { Header } from "@/components/dashboard/layout/Nav"
import { SiteHeader } from "@/components/site-header"
import {
	Breadcrumb,
	BreadcrumbItem,
	BreadcrumbLink,
	BreadcrumbList,
	BreadcrumbPage,
	BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { Separator } from "@/components/ui/separator"
import {
	SidebarInset,
	SidebarProvider,
	SidebarTrigger,
} from "@/components/ui/sidebar"
import { auth } from "@/lib/auth/auth"
import { redirect } from "next/navigation"

export default async function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode
}>) {
	const session = await auth()
	if (!session) {
		redirect("/signin")
	}

	return (
		<>
			<div className="[--header-height:calc(--spacing(14))]">
				<SidebarProvider className="flex flex-col">
					<SiteHeader />
					<div className="flex flex-1">
						<AppSidebar session={session} />
						<SidebarInset>{children}</SidebarInset>
					</div>
				</SidebarProvider>
			</div>
		</>
	)
}
