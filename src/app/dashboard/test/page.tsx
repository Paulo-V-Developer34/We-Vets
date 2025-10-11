import { redirect } from "next/navigation";
import { auth } from "@/lib/auth/auth";

export default async function AgendamentosPage() {
	const session = await auth();
	// if (!session) {
	// 	redirect("/signin");
	// }

    if(!session){
        return <h1>USUÁRIO NÃO ESTÁ LOGADO</h1>
    }else{
        if(session.user.name === "Alice"){
            return (
                <>
                    <h1>Usuário logado!!! Usuário: {session.user.name}</h1>
                    <h2>VOCÊ É UM ADM! QUE LEGAL!!!!!!!!!!!!!!!!!!!</h2>
                </>
            )
        }
        return <h1>Usuário logado!!! Usuário: {session.user.name}</h1>;
    }
}
