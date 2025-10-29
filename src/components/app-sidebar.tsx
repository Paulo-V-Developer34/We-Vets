"use client"

import * as React from "react"
import {
	BookOpen,
	Bot,
	Command,
	Frame,
	LifeBuoy,
	Map,
	PieChart,
	Send,
	Settings2,
	Sheet,
	SquareTerminal,
} from "lucide-react"

import { NavMain } from "@/components/nav-main"
import { NavProjects } from "@/components/nav-projects"
import { NavSecondary } from "@/components/nav-secondary"
import { NavUser } from "@/components/nav-user"
import {
	Sidebar,
	SidebarContent,
	SidebarFooter,
	SidebarHeader,
	SidebarMenu,
	SidebarMenuButton,
	SidebarMenuItem,
} from "@/components/ui/sidebar"
import { Session } from "next-auth"

const data = {
	user: {
		name: "shadcn",
		email: "m@example.com",
		avatar: "/favicon.png",
	},
	navSecondary: [
		{
			title: "Support",
			url: "#",
			icon: LifeBuoy,
		},
		{
			title: "Feedback",
			url: "#",
			icon: Send,
		},
	],
	projects: [
		{
			name: "Design Engineering",
			url: "#",
			icon: Frame,
		},
		{
			name: "Sales & Marketing",
			url: "#",
			icon: PieChart,
		},
		{
			name: "Travel",
			url: "#",
			icon: Map,
		},
	],
}

const navMain = [
	{
		title: "Clínica",
		url: "#",
		icon: SquareTerminal,
		isActive: true,
		items: [
			{
				title: "Dashboard",
				url: "#",
			},
			{
				title: "Agendamentos",
				url: "#",
			},
			{
				title: "Clientes",
				url: "#",
			},
			{
				title: "Pacientes",
				url: "#",
			},
			{
				title: "Estoque",
				url: "#",
			},
		],
	},
	{
		title: "Relatórios",
		url: "#",
		icon: Sheet,
		items: [
			{
				title: "DRE",
				url: "#",
			},
			{
				title: "ABC",
				url: "#",
			},
		],
	},
	{
		title: "Diários",
		url: "#",
		icon: BookOpen,
		items: [
			{
				title: "Diário ABC",
				url: "#",
			},
			{
				title: "Diário DEF",
				url: "#",
			},
		],
	},
	{
		title: "Settings",
		url: "#",
		icon: Settings2,
		items: [
			{
				title: "General",
				url: "#",
			},
		],
	},
]
export function AppSidebar({
	session,
	...props
}: { session: Session } & React.ComponentProps<typeof Sidebar>) {
	return (
		<Sidebar
			className="top-(--header-height) h-[calc(100svh-var(--header-height))]!"
			{...props}
		>
			<SidebarHeader>
				<SidebarMenu>
					<SidebarMenuItem>
						<SidebarMenuButton size="lg" asChild>
							<a href="#">
								<div className="bg-sidebar-primary text-sidebar-primary-foreground flex aspect-square size-8 items-center justify-center rounded-lg">
									<Command className="size-4" />
								</div>
								<div className="grid flex-1 text-left text-sm leading-tight">
									<span className="truncate font-medium">Acme Inc</span>
									<span className="truncate text-xs">Enterprise</span>
								</div>
							</a>
						</SidebarMenuButton>
					</SidebarMenuItem>
				</SidebarMenu>
			</SidebarHeader>
			<SidebarContent>
				<NavMain items={navMain} />
				<NavSecondary items={data.navSecondary} className="mt-auto" />
			</SidebarContent>
			<SidebarFooter>
				<NavUser user={data.user} />
			</SidebarFooter>
		</Sidebar>
	)
}
