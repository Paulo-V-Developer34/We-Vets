export default function CreateAccountForm(){
    return (
        <div className="controle-modal" id="modalCadastrar">
            <div className="controle-modal-box">
                <button className="controle-fechar" data-close="modalCadastrar">
                    <h3>Criar conta</h3>
                </button>
                <form className="controle-formulario" id="formCadastrar">
                    <input className="controle-input" name="nome" placeholder="Nome da clínica" required/>
                    <input className="controle-input" name="email" type="email" placeholder="E-mail" required/>
                    <input className="controle-input" name="telefone" placeholder="Telefone"/>
                    <input className="controle-input" name="senha" type="password" placeholder="Senha" required/>
                    <div className="controle-modal-footer">
                        <button type="button" className="controle-botao controle-botao--escuro" data-close="modalCadastrar">Cancelar</button>
                        <button type="submit" className="controle-botao controle-botao--claro">Cadastrar</button>
                    </div>
                </form>
            </div>
      </div>
    )
}