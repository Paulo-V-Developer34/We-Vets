export default function NavBar(){
    return (
        <div className="controle-cabecalho-interno">
          <div className="controle-marca">
            <div className="controle-logo"><i className="fa-solid fa-paw"></i></div>
            <div className="controle-titulo-marca"><strong>WeVet</strong><span>Clínica & Gestão Veterinária</span></div>
          </div>
          <nav className="controle-navegacao">
            <a href="#ferramentas">Ferramentas</a>
            <a href="#relatorios">Relatórios</a>
            <a href="#planos">Planos</a>
            <a href="#produtos">Produtos</a>
            <a href="#faq">FAQ</a>
          </nav>
          <div style={{display:'flex',gap:'10px'}}>
            <button className="controle-botao controle-botao--claro" id="btnEntrar">Entrar</button>
            <button className="controle-botao controle-botao--escuro" id="btnCadastrar">Cadastrar</button>
          </div>
        </div>
    )
}