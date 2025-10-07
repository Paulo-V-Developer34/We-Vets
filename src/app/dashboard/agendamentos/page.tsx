import { redirect } from "next/navigation"

export default function AgendamentosPage(){
    const session = null
    if(!session){
        redirect("/signin")
    }

    return (
        <h1>Pagina de agendamentos</h1>
    )
}