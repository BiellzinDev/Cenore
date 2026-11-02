import imagens from '../imagens.json';

const About = () => {
  return (
    <section className="py-8 pb-20">
        <section className="w-full flex flex-col text-center justify-center items-center">
            <h2 className="bg-[#c26918] text-white font-bold rounded-3xl py-2 px-6">Quem somos?</h2>
            <section className="flex flex-col w-[90%] items-center justify-center gap-8 py-6">
                <picture className="w-3/4">
                    <img src={imagens.contato.confeiteiro} alt="" />
                </picture>
                <p className="text-justify">A Cenorê nasceu da evolução da antiga Thafarelli Confeitaria, criada pelas irmãs Thalita e Karina a partir da experiência com confeitaria artesanal.
                Em 2017, Thalita iniciou sua atuação profissional, tendo como destaque o Pão de Cenoura recheado com brigadeiro gourmet, que inspirou o nome Cenorê.
                Com o crescimento do negócio, a marca passou por um reposicionamento, mantendo sua essência e proximidade com os clientes. Em 2025, o projeto foi retomado com foco em aperfeiçoamento e expansão.
                Atualmente, a Cenorê atende principalmente Barueri, Santana de Parnaíba, São Paulo e ABC, tendo como pilares a produção artesanal, qualidade e cuidado em cada detalhe.
                </p>
                <picture className="w-4/5">
                    <img src={imagens.contato.confeiteiro2} alt="" />
                </picture>
            </section>
        </section>
    </section>
  )
}

export default About