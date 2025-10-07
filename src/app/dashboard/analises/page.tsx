import { redirect } from "next/navigation"

export default function AnalisePage(){
    const session = null
    if(!session){
        redirect("/signin")
    }
    
    return (
        <h1>Pagina de analise</h1>
    )
}