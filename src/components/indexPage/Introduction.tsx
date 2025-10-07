export default function Introduction(){
    return (
        <section className="controle-apresentacao controle-secao">
          <div className="controle-conteudo controle-apresentacao-grid">
            <div className="controle-revelar">
              <h1>Cuidado clínico e gestão impecável no mesmo lugar</h1>
              <p>Agendamento inteligente, prontuário completo, planos de fidelização e loja integrada.</p>
              <div className="controle-insignias">
                <div className="controle-contadores">
                  <div className="controle-contador"><strong id="cont1">0</strong><span className="controle-subtexto">Clínicas ativas</span></div>
                  <div className="controle-contador"><strong id="cont2">0</strong><span className="controle-subtexto">Agendamentos/mês</span></div>
                  <div className="controle-contador"><strong id="cont3">0</strong><span className="controle-subtexto">Pacientes cadastrados</span></div>
                </div>
              </div>
              <div className="controle-mini-entradas">
                <div className="controle-mini-entrada">Contabilidade</div>
                <div className="controle-mini-entrada">Fluxo de Caixa</div>
              </div>
              <div className="controle-mini-entradas">
                <div className="controle-mini-entrada">Economia</div>
                <div className="controle-mini-entrada">Finanças</div>
              </div>
            </div>
            <div style={{ position:'relative' }}>
              <div className="controle-carrossel controle-revelar controle-sombra controle-arredondado" id="carrossel">
                <div className="controle-slides" id="slides">
                  <div className="controle-slide"><img src="Imagens/capa1.jpg" alt="Atendimento veterinário"/></div>
                  <div className="controle-slide"><img src="Imagens/capa2.jpg" alt="Cão em consulta"/></div>
                  <div className="controle-slide"><img src="Imagens/capa3.jpg" alt="Gato sendo examinado"/></div>
                </div>
                <button className="controle-seta controle-seta--esquerda" id="setaEsq" aria-label="Anterior"><i className="fa-solid fa-chevron-left"></i></button>
                <button className="controle-seta controle-seta--direita" id="setaDir" aria-label="Próximo"><i className="fa-solid fa-chevron-right"></i></button>
                <div className="controle-pontos" id="dots">
                  <div className="controle-ponto controle-ativo" data-i="0"></div>
                  <div className="controle-ponto" data-i="1"></div>
                  <div className="controle-ponto" data-i="2"></div>
                </div>
              </div>
            </div>
          </div>
        </section>
    )
}