export default function SessionControl(){
    return (
         <section id="faq" className="controle-secao">
          <div className="controle-conteudo">
            <h2>Perguntas frequentes</h2>
            <div className="controle-perguntas controle-perguntas-coluna">
              <details className="controle-revelar"><summary>Como o WeVet ajuda minha clínica? <i className="fa-solid fa-plus"></i></summary><div className="controle-subtexto" style={{ marginTop:'8px' }}>Centraliza dados, automatiza lembretes, reduz faltas e entrega relatórios para decisões rápidas.</div></details>
              <details className="controle-revelar"><summary>Posso migrar registros antigos? <i className="fa-solid fa-plus"></i></summary><div className="controle-subtexto" style={{ marginTop:'8px' }}>Sim, aceitamos CSV e oferecemos suporte guiado de importação.</div></details>
              <details className="controle-revelar"><summary>Existe contrato mínimo? <i className="fa-solid fa-plus"></i></summary><div className="controle-subtexto" style={{ marginTop:'8px' }}>Planos mensais e anuais, cancelamento simples quando quiser.</div></details>
              <details className="controle-revelar"><summary>A plataforma tem loja integrada? <i className="fa-solid fa-plus"></i></summary><div className="controle-subtexto" style={{ marginTop:'8px' }}>Sim, com catálogo, carrinho e controle de estoque integrado.</div></details>
            </div>
          </div>
        </section>
    )
}