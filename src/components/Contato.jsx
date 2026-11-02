import imagens from '../imagens.json'


const Contato = () => {
  return (
    <section className="py-8 pb-20">
        <section className="w-full flex flex-col text-center justify-center items-center">
            <h2 className="bg-[#c26918] text-white font-bold rounded-3xl py-2 px-6 mb-4 w-4/5">Fale conosco</h2>
            <article className="flex items-center justify-center gap-2">
                <picture>
                    <img src={imagens.contato.whatsApp} className="w-6" alt="Imagem WhatsApp" />
                </picture>
                <address className="font-semibold">
                    (11)98151-1804 <br />
                    (11)99605-0105
                </address>
            </article>
            <article className="flex items-center justify-center gap-0.5">
                <picture>
                    <img src={imagens.contato.instagram} className="w-6" alt="Imagem instagram" />
                </picture>
                <a href="https://www.instagram.com/cenoreconfeitaria?exln=Z2V4ejh0YTRzaTdy" target='_blank' className="font-bold">cenoreconfeitaria</a>
            </article>
            <section className="flex flex-col w-full items-center justify-center gap-8 py-6">
                <h2 className="bg-[#c26918] text-white font-bold rounded-3xl py-2 px-6 mb-4 w-4/5">Fale conosco</h2>
                <p className="text-center font-bold text-[1.2rem] w-[90%]">Mensagem recebida (23 de abril de 2025):
                Oii! esqueci de dar um feedback do bolinho. uma das melhores coisas que comi nos últimos dias!! estava perfeito. não sei se era só edição de páscoa, mas se sim, espero que tenha mais vezes :(Resposta (08:33):muito bom mesmo 🥰Resposta (em outra mensagem):Oii bom dia! Ahh fico muito feliz!! Não era só edição de páscoa não 😊 Vou postar... Obrigada pelo feedback!💗</p>
                
            </section>
        </section>
    </section>
  )
}

export default Contato