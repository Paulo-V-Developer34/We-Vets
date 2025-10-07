export default function EntryGateButtons(){
    return (
        <div className="controle-modal" id="modalEntrar">
        <div className="controle-modal-box">
          <button className="controle-fechar" data-close="modalEntrar">×</button>
          <h3>Entrar</h3>
          <form className="controle-formulario" id="formEntrar">
            <input className="controle-input" name="email" type="email" placeholder="E-mail" required/>
            <input className="controle-input" name="senha" type="password" placeholder="Senha" required/>
            <div className="controle-modal-footer">
              <button type="button" className="controle-botao controle-botao--escuro" data-close="modalEntrar">Cancelar</button>
              <button type="submit" className="controle-botao controle-botao--claro">Entrar</button>
            </div>
          </form>
        </div>
      </div>
    )
}