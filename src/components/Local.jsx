import imagens from '../imagens.json';

const Local = () => {
  return (
    <section className="py-8 pb-20">
        <section className="w-full flex flex-col text-center justify-center items-center">
            <h2 className="bg-[#c26918] text-white font-bold rounded-3xl py-2 px-6">Onde estamos localizados</h2>
            <section className="flex flex-col w-[90%] items-center justify-center gap-8 py-6">
                <picture>
                    <img src={imagens.contato.quemSomos} alt="" />
                </picture>
                <iframe className="w-full h-70 rounded-3xl" src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d234264.94004647428!2d-47.08227956712465!3d-23.446404023757253!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x94cf1b48cc9f4fbd%3A0x9e2a5b9e0e692e6c!2sSantana%20de%20Parna%C3%ADba%2C%20SP!5e0!3m2!1spt-BR!2sbr!4v1793137330309!5m2!1spt-BR!2sbr" loading="lazy" referrerPolicy="strict-origin-when-cross-origin"></iframe>
            </section>
        </section>
    </section>
  )
}

export default Local