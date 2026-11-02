
const Faq = () => {
  return (
    <section className="py-8 pb-20">
        <section className="w-full flex flex-col text-center justify-center items-center">
            <h2 className="bg-[#c26918] text-white font-bold rounded-3xl py-2 px-6 mb-4">Perguntas Frequentes</h2>
            <section className="flex flex-col w-[90%] items-center justify-center gap-8 py-6">
                <article className="flex items-center justify-center flex-col">
                    <h4 className="font-semibold">Vocês fazem entrega?</h4>
                    <p>Sim! Consulte as regiões atendidas, horários e valores de entrega.</p>
                </article>
                <article className="flex items-center justify-center flex-col">
                    <h4 className="font-semibold">É possível escolher mais de um recheio?</h4>
                    <p>Sim, dependendo do tamanho e do modelo do bolo, é possível combinar diferentes sabores.</p>
                </article>
                <article className="flex items-center justify-center flex-col">
                    <h4 className="font-semibold">Vocês trabalham com kits para festas?</h4>
                    <p>Sim! Podemos montar opções com bolos e doces de acordo com a quantidade e o tipo de evento.</p>
                </article>
                <article className="flex items-center justify-center flex-col">
                    <h4 className="font-semibold">Posso retirar meu pedido na loja?</h4>
                    <p>Sim. A retirada pode ser feita no horário combinado no momento da encomenda.</p>
                </article>
                <article className="flex items-center justify-center flex-col">
                    <h4 className="font-semibold">Com quanto tempo de antecedência devo fazer meu pedido?</h4>
                    <p>Recomendamos antecedência, especialmente para bolos personalizados e grandes encomendas. Pedidos de última hora dependem da disponibilidade.</p>
                </article>
            </section>
        </section>
    </section>
  )
}

export default Faq
