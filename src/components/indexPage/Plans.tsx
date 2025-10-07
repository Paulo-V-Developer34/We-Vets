export default function Plans(){
    return (
        <section id="planos" className="controle-secao controle-alternativa">
          <div className="controle-conteudo">
            <h2>Planos de Assinatura</h2>
            <p className="controle-subtexto">Reduza custos, aumente a recorrência e padronize o cuidado.</p>
            <div className="controle-planos-grid">
              <div className="controle-plano controle-revelar" data-plan="essencial">
                <h4>Essencial</h4>
                <p>1 consulta anual + 10% em extras</p>
                <div className="controle-preco">R$ 39 / mês</div>
                <ul>
                  <li>Lembretes automáticos</li>
                  <li>Relatório mensal</li>
                  <li>Suporte chat</li>
                </ul>
                <div style={{ marginTop:'14px' }}><button className="controle-botao controle-botao--claro">Assinar</button></div>
              </div>
              <div className="controle-plano controle-revelar controle-plano--destaque" data-plan="completo">
                <h4>Completo</h4>
                <p>2 consultas + vacinas programadas</p>
                <div className="controle-preco">R$ 79 / mês</div>
                <ul>
                  <li>15% em produtos</li>
                  <li>Teleorientação</li>
                  <li>Exportação de dados</li>
                </ul>
                <div style={{ marginTop:'14px' }}><button className="controle-botao controle-botao--claro">Assinar</button></div>
              </div>
              <div className="controle-plano controle-revelar" data-plan="premium">
                <h4>Premium</h4>
                <p>Consultas ilimitadas + priorização</p>
                <div className="controle-preco">R$ 149 / mês</div>
                <ul>
                  <li>Descontos especiais</li>
                  <li>Atendimento dedicado</li>
                  <li>Relatórios avançados</li>
                </ul>
                <div style={{ marginTop:'14px' }}><button className="controle-botao controle-botao--claro">Assinar</button></div>
              </div>
            </div>
          </div>
        </section>
    )
}