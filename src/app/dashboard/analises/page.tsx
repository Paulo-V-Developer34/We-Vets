import { auth } from "@/lib/auth/auth";
import { redirect } from "next/navigation";

export default async function AnalisePage() {
	const session = await auth();
	if (!session) {
		redirect("/signin");
	}

	return <h1>Pagina de analise</h1>;
}
