import { auth, signOut } from "@/lib/auth/auth";
import { LogOutIcon } from "lucide-react";
import Link from "next/link";

export default async function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	const user = await auth();
	const name = user?.user.name;
	const email = user?.user.email;

	return (
		<>
			<nav className="flex justify-between bg-emerald-500 w-full h-20">
				<h1>We Vets</h1>
				<Link href={"/dashboard/agendamentos"}>Agendamentos</Link>
				<Link href={"/dashboard/analises"}>Analise</Link>
				<div>
					<form
						action={async () => {
							"use server";
							await signOut();
						}}
					>
						<button type="submit">
							<LogOutIcon />
						</button>
					</form>
					<h2>Nome: {name}</h2>
					<h2>Email: {email}</h2>
				</div>
			</nav>
			{children}
		</>
	);
}
