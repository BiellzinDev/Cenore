import imagens from '../imagens.json'

const Orcamento = () => {
  // ⚠️ Configuração do número do WhatsApp
  const numeroWhatsApp = "5511960246299";

  // Função que lida com o clique e abre o WhatsApp com os dados formatados
  const handleWhatsAppClick = (e) => {
    e.preventDefault(); // Evita o comportamento padrão de submit do formulário

    const dataEntrega = document.querySelector('input[type="date"]').value;
    const horaEntrega = document.querySelector('input[type="time"]').value;
    const pedido = document.querySelector('textarea[name="Pedido"]').value;

    // Monta o texto que será enviado juntando as informações
    const textoMensagem = `Olá! Gostaria de solicitar um orçamento:\n\n` +
                          `*Data de Entrega:* ${dataEntrega || 'Não informada'}\n` +
                          `*Horário de Entrega:* ${horaEntrega || 'Não informado'}\n` +
                          `*Pedido:*\n${pedido || 'Nenhum detalhe informado'}`;

    const mensagemFormatada = encodeURIComponent(textoMensagem);
    const urlWhatsApp = `https://wa.me/${numeroWhatsApp}?text=${mensagemFormatada}`;
    
    window.open(urlWhatsApp, '_blank');
  };

  return (
    <section className="py-8 pb-20">
        <section className="w-full flex flex-col text-center justify-center items-center gap-2">
            <article className="w-full items-center justify-center flex gap-4 mb-8 max-w-120">
              <h2 className="bg-[#c26918] text-white font-bold rounded-3xl py-2 w-[75%]">Solicitação de Orçamento</h2>
              <picture>
                    <img src={imagens.contato.whatsAppMenor} className="w-9" alt="Imagem WhatsApp" />
                </picture>
            </article>
            
            <form className="flex w-full flex-col gap-4 items-center justify-center">
              <article className="flex justify-center items-center gap-4">
                <label htmlFor="date" className="font-bold">Data Entrega:</label>
                <input type="date" id="date" className="flex gap-1 border border-[#e5ccb6] rounded-[10px] text-[#8b4513] p-2 items-center justify-start bg-[#fff1df]" />
              </article>
              
              <article className="flex justify-center items-center gap-4">
                <label htmlFor="hour" className="font-bold">Horário Entrega:</label>
                <input type="time" id="hour" className="flex gap-1 border border-[#e5ccb6] rounded-[10px] text-[#8b4513] bg-[#fff1df] p-2 items-center justify-start" />
              </article>
              
              <article className="flex flex-col justify-center items-center gap-4 h-60 my-4">
                <label htmlFor="pedido" className="font-bold">Pedido:</label>
                <textarea name="Pedido" maxLength={200} className="flex gap-1 border border-[#e5ccb6] rounded-[10px] p-2 items-center justify-start bg-[#fff1df] text-[#8b4513] resize-none w-72 md:w-100 h-full" id="pedido"></textarea>
              </article>
              
              <button 
                type="button"
                onClick={handleWhatsAppClick} 
                className="bg-[#c26918] text-white font-bold text-[1.2rem] rounded-3xl py-2 w-[75%] max-w-100 hover:opacity-65 cursor-pointer flex justify-center gap-2 items-center"
              >
                <i className="fi fi-rr-document flex text-[1rem] "></i>Enviar Solicitação
              </button>
            </form>
            
            <p className="w-48 pt-4">Orçamentos e cotações são respondidos no prazo de 24 horas uteis</p>
        </section>
    </section>
  );
};

export default Orcamento;