import imagens from '../imagens.json'

const Orcamento = () => {
  return (
    <section className="py-8 pb-20">
        <section className="w-full flex flex-col text-center justify-center items-center">
            <article className="w-full items-center justify-center flex gap-4 mb-8">
              <h2 className="bg-[#c26918] text-white font-bold rounded-3xl py-2 w-[75%]">Solicitação de Orçamento</h2>
              <picture>
                    <img src={imagens.contato.whatsAppMenor} className="w-9" alt="Imagem WhatsApp" />
                </picture>
            </article>
            <form className="flex flex-col gap-4 items-center justify-center">
              <article className="flex justify-center items-center gap-4">
                <label htmlFor="date" className="font-bold">Data Entrega:</label>
                <input type="date" className="border border-rose-950 bg-[#ced8e0]" />
              </article>
              <article className="flex justify-center items-center gap-4">
                <label htmlFor="hour" className="font-bold">Horário Entrega:</label>
                <input type="time" className="border border-rose-950 bg-[#ced8e0]" />
              </article>
              <article className="flex flex-col justify-center items-center gap-4 h-60 my-4">
                <label htmlFor="pedido" className="font-bold">Pedido:</label>
                <textarea name="Pedido" className="border-rose-950 bg-[#ced8e0] resize-none w-72 h-full" id="pedido"></textarea>
              </article>
            </form>
            <p className="w-48">Orçamentos e cotações são respondidos no prazo de 24 horas uteis</p>
            
        </section>
    </section>
  )
}

export default Orcamento