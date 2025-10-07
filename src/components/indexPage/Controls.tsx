export default function Controls(){
    return (
        <section className="controle-depoimentos controle-secao controle-alternativa">
            <div className="controle-env">
                <h2 style={{ textAlign:'center' }}>O que dizem nossos clientes</h2>
                <p className="controle-subtexto" style={{ textAlign:'center' }}>Depoimentos reais de clínicas que já usam o WeVet. Agora passam automaticamente com setinhas.</p>
                <div className="controle-carrossel-depoimentos" id="testimonials" style={{ marginTop:'20px',maxWidth:'980px',marginLeft:'auto',marginRight:'auto',position:'relative'}}>
                    <div className="controle-pista-depoimentos" id="testimonialTrack"></div>
                    <div className="controle-navegacao-depoimentos">
                        <button className="controle-seta controle-seta--esquerda" id="testiLeft" aria-label="Anterior"><i className="fa-solid fa-chevron-left"></i></button>
                        <button className="controle-seta controle-seta--direita" id="testiRight" aria-label="Próximo"><i className="fa-solid fa-chevron-right"></i></button>
                    </div>
                    <div style={{ position:'absolute',right:'12px',bottom:'12px',display:'flex',gap:'8px' }} id="testiDots"></div>
                </div>
            </div>
        </section>
    )
}