'use client'

import { signIn } from "next-auth/react"



export default function LoginForm(){

    return (
        <>
            <div className="ControleTela">
                <div className="ControleEsquerda">
                {/* <!-- Imagem de fundo profissional --> */}
                <div className="ControleImagem" role="img" aria-label="Foto da clínica"></div>

                <div className="ControleFrase">
                    <h1 id="BoasVindas" className="ControleBoasVindas"></h1>
                    <p className="ControleMensagemEsq">Gerencie sua clínica com praticidade e segurança.</p>
                </div>

                    <div className="decor-patas ControlePataEsq" aria-hidden="true">
                    <i className="fa-solid fa-paw"></i>
                </div>
                <div className="decor-patas ControlePataDir" aria-hidden="true">
                    <i className="fa-solid fa-paw"></i>
                </div>
                </div>



                    {/* <!-- Lado direito --> */}
                    <main className="ControleDireita" role="main" aria-labelledby="ControleTitulo">
                    <div className="ControleLogin">
                        <header className="ControleTopo">
                        {/* <div className="ControleLogo"><img src="Imagens/logo.png" alt="WeVet"/></div> */}
                        <div className="ControleNome">WeVet</div>
                        </header>

                        <h3 id="ControleTitulo" className="ControleTitulo">Acesse sua conta</h3>
                        <p className="ControleSub">Gerencie agendamentos, prontuários e estoque da clínica.</p>

                        <form id="ControleForm" className="ControleForm" autoComplete="on" action={()=>(signIn())}>
                        <div className="ControleGrupo">
                            <label htmlFor="email" className="ControleRotulo">E-mail</label>
                            <input id="email" name="email" type="email" className="ControleEntrada" placeholder="seu@clinica.com" autoComplete="email" required/>
                        </div>

                        <div className="ControleGrupo">
                            <label htmlFor="password" className="ControleRotulo">Senha </label>
                            <div className="ControleAcao">
                            <input id="password" name="password" type="password" className="ControleEntrada" placeholder="Digite a senha" autoComplete="current-password" required/>
                            <button type="button" className="ControleIcone" id="Controlepassword" aria-label="Mostrar senha"><i className="fa-regular fa-eye"></i></button>
                            </div>
                        </div>

                        <div className="ControleLinha">
                            <label className="ControleLembrar"><input type="checkbox" id="lembrar"/> Lembrar-me</label>
                            <a href="#" id="ControleEsqueci" className="ControleLink">Esqueci minha senha</a>
                        </div>

                        <div className="ControleBotoes">
                            <button type="submit" className="ControleBotao ControlePrimario">ENTRAR</button>
                            <button type="button" className="ControleBotao ControleSecundario" id="ControleCriar">CRIAR CONTA</button>
                        </div>

                        <div id="ControleMensagem" className="ControleMensagem"></div>
                        </form>

                        <footer className="ControleRodape">© <span id="anoAtual"></span> WeVet — Todos os direitos reservados</footer>
                    </div>
                    </main>
            </div>
        </>
    )
}