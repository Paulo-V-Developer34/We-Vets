import LoginForm from "@/components/login/LoginForm";
import "@/css/login.css";
import { auth } from "@/lib/auth/auth";
import { redirect } from "next/navigation";

export default async function SigninPage() {
	const session = await auth();
	if (session) {
		redirect("/dashboard/agendamentos");
	}
	return (
		<div>
			<LoginForm />
		</div>
	);
}
