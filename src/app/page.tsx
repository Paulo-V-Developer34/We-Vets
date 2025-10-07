"use client"

import Controls from "@/components/indexPage/Controls";
import CreateAccountForm from "@/components/indexPage/CreateAccount";
import EntryGateButtons from "@/components/indexPage/EntryGate";
import Footer from "@/components/indexPage/Footer";
import Introduction from "@/components/indexPage/Introduction";
import NavBar from "@/components/indexPage/NavBar";
import Plans from "@/components/indexPage/Plans";
import Products from "@/components/indexPage/Products";
import Reports from "@/components/indexPage/Reports";
import SessionControl from "@/components/indexPage/SessionControl";
import Tools from "@/components/indexPage/Tools";
import '@/css/style.css'

// import { login } from "@/lib/action";
// import { useActionState } from "react";

export default function Home() {
  //const [errorMessage, formAction] = useActionState(login, null)

  return (
    <>
      <header className="controle-cabecalho">
        <NavBar/>
      </header>
      <main>
        <Introduction/>
        <Tools/>
        <Reports/>
        <Plans/>
        <Products/>
        <Controls/>
        <SessionControl/>
      </main>
      <Footer/>

      <EntryGateButtons/>
      <CreateAccountForm/>
    </>
  );
}
