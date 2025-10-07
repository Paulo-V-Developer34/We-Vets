export default function Tools(){
    return (
        <section id="ferramentas" className="controle-secao controle-alternativa">
          <div className="controle-conteudo">
            <h2>Ferramentas Principais</h2>
            <p className="controle-subtexto">Clique para visualizar cada módulo</p>
            <div className="controle-ferramentas">
              <div className="controle-lista-ferramentas controle-revelar" id="listaFerramentas">
                <div className="controle-item-ferramenta controle-ativo" data-chave="agendamento" data-img="/ferramenta1.png">
                  <i className="fa-regular fa-calendar"></i>
                  <div><strong>Agendamento</strong><div className="controle-subtexto" style={{ fontSize:'15px' }}>Confirmação automática, lembretes e fila de espera inteligente.</div></div>
                </div>
                <div className="controle-item-ferramenta" data-chave="prontuario" data-img="/ferramenta2.png">
                  <i className="fa-solid fa-file-medical"></i>
                  <div><strong>Prontuário</strong><div className="controle-subtexto" style={{ fontSize:'15px' }}>Histórico detalhado, imagens e prescrições digitais.</div></div>
                </div>
                <div className="controle-item-ferramenta" data-chave="planos" data-img="/ferramenta3.png">
                  <i className="fa-solid fa-wallet"></i>
                  <div><strong>Planos</strong><div className="controle-subtexto" style={{ fontSize:'15px' }}>Assinaturas, cobranças recorrentes e benefícios exclusivos.</div></div>
                </div>
                <div className="controle-item-ferramenta" data-chave="estoque" data-img="/ferramenta4.png">
                  <i className="fa-solid fa-box-open"></i>
                  <div><strong>Estoque</strong><div className="controle-subtexto" style={{ fontSize:'15px' }}>Controle de lotes, validade e alertas de reposição.</div></div>
                </div>
                <div className="controle-item-ferramenta" data-chave="loja" data-img="/ferramenta5.png">
                  <i className="fa-solid fa-bag-shopping"></i>
                  <div><strong>Loja</strong><div className="controle-subtexto" style={{ fontSize:'15px' }}>Catálogo completo, carrinho e PDV integrado.</div></div>
                </div>
              </div>

              <div className="controle-painel-ferramenta controle-revelar">
                <img id="imgFerramenta" className="controle-imagem-ferramenta" src="https://images.unsplash.com/photo-1526253038957-bce54e05968b?q=80&w=1600&auto=format&fit=crop" alt="Ferramenta"/>
                <h3 id="tituloFerramenta" style={{ margin:'0 0 6px' }}>Agendamento</h3>
                <p id="descFerramenta" className="controle-subtexto" style={{ margin:'0' }}>Marcação rápida, lembretes por e-mail/SMS e bloqueio inteligente de horários.</p>
                <div style={{ marginTop:'auto',display:'flex',gap:'10px',alignItems:'center' }}>
                  <button className="controle-botao controle-botao--claro">Abrir módulo</button>
                  <button className="controle-botao controle-botao--escuro">Ver configurações</button>
                </div>
              </div>
            </div>
          </div>
        </section>
    )
}