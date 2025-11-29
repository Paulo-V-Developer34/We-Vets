import { redirect } from "next/navigation"
import { auth } from "@/lib/auth/auth"

export default async function AgendamentosPage() {
	const session = await auth()
	if (!session) {
		redirect("/signin")
	}

	return <h1>Pagina de estoque</h1>
}
