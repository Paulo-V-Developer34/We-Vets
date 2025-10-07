export default function Reports(){
    return (
        <section id="relatorios" className="controle-secao controle-relatorios">
          <div className="controle-conteudo">
            <h2 style={{ color:'#fff' }}>Relatórios & Insights</h2>
            <div className="controle-filtros" id="chips">
              <button className="controle-filtro controle-ativo" data-key="todos">Todos</button>
              <button className="controle-filtro" data-key="caes">Cães</button>
              <button className="controle-filtro" data-key="gatos">Gatos</button>
              <button className="controle-filtro" data-key="exoticos">Exóticos</button>
            </div>
            <p className="controle-subtexto" style={{ color:' #FFFFFFF2' }}>Use os filtros para ajustar os gráficos — exporte CSV/PDF com um clique.</p>
            <div className="controle-grid-relatorios">
              <div>
                <div className="controle-cartoes">
                  <div className="controle-cartao controle-cartao--escuro">
                    <strong>Visão geral</strong>
                    <p style={{ opacity:'.95',margin:'8px 0 0' }}>Acompanhe atendimentos, presença e ticket médio por período.</p>
                  </div>
                  <div className="controle-cartao controle-cartao--claro">
                    <strong>Filtros</strong>
                    <p style={{ opacity:'.9',margin:'8px 0 0' }}>Profissional, espécie, período e canal de agendamento.</p>
                  </div>
                  <div className="controle-cartao controle-cartao--claro">
                    <strong>Exportação</strong>
                    <p style={{ opacity:'.9',margin:'8px 0 0' }}>CSV e PDF com um clique.</p>
                  </div>
                  <div className="controle-cartao controle-cartao--escuro">
                    <strong>Comparativos</strong>
                    <p style={{ opacity:'.9',margin:'8px 0 0' }}>Compare semanas e identifique picos e quedas.</p>
                  </div>
                  <div className="controle-cartao controle-cartao--sucesso">
                    <strong>Taxas & Receita</strong>
                    <p style={{ margin:'8px 0 0' }}>Análise de taxas e margem por serviço.</p>
                  </div>
                  <div className="controle-cartao controle-cartao--claro">
                    <strong>Agenda por Veterinário</strong>
                    <p style={{ opacity:'.9',margin:'8px 0 0' }}>Distribuição de atendimentos por profissional.</p>
                  </div>
                </div>
              </div>
              <div>
                <div className="controle-cartao-grafico">
                  <canvas id="graficoAtendimentos" height="260"></canvas>
                </div>
              </div>
            </div>
          </div>
        </section>
    )
}