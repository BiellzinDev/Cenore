const imgFundo = './public/fundo-login.webp'
const imgCadeadoLogin = './public/cadeado-login.webp'
const imgLogoLogin = './public/cenore-login.webp'
const cakeLogin = './public/cake-login.webp'

const TelaCadastro = () => {
  return (
    <section className="w-full relative flex justify-center items-center">
        <picture>
            <img src={imgFundo} className="" alt="Imagem de fundo da tela de login com brigadeiro" />
        </picture>
         <section className="absolute bg-[#fdf3e6] w-[85%] py-4 rounded-4xl px-2">
            <form className="flex flex-col items-center justify-center gap-3">
                <section className="flex w-[90%] items-center justify-start gap-2">
                    <picture className="flex items-center justify-center text-[#753812] text-3xl">
                        <i className="fi fi-sr-user-add flex"></i>
                    </picture>
                    <article className="flex flex-col items-center justify-start">
                        <h2 className="font-bold w-full text-left text-[1.2rem] text-[#753812]">Cadastro de Usuário</h2>
                        <p className="text-left text-[.75rem] text-[#753812] font-medium">Preencha os dados abaixo para criar sua conta.</p>
                    </article>
                </section>
                <section className="flex gap-1 border border-[#e5ccb6] rounded-[10px] p-2 w-[90%] items-center justify-start">
                    <picture className="flex items-center justify-center"><i className="fi fi-ss-user text-[#753812] flex"></i></picture>
                    <label htmlFor="user"></label>
                    <input type="text" className="w-[90%] focus:outline-none" placeholder="Nome Completo" />
                </section>
                <section className="flex gap-1 border border-[#e5ccb6] rounded-[10px] p-2 w-[90%] items-center justify-start">
                    <picture className="flex items-center justify-center"><i className="fi fi-sr-envelope text-[#753812] flex"></i></picture>
                    <label htmlFor="user"></label>
                    <input type="text" className="w-[90%] focus:outline-none" placeholder="E-mail" />
                </section>
                <section className="flex gap-1 border border-[#e5ccb6] rounded-[10px] p-2 w-[90%] items-center justify-between">
                    <article className="flex gap-1 w-[90%] items-center justify-start">
                        <picture><i className="fi fi-ss-lock text-[#753812] flex"></i></picture>
                        <label htmlFor="senha"></label>
                        <input type="password" className="w-[80%] focus:outline-none" placeholder="Senha"/>
                    </article>
                    <picture><i className="fi fi-ss-eye-crossed text-[#753812] flex"></i></picture>
                    <picture className="hidden"><i className="fi fi-sr-eye text-[#753812]"></i></picture>
                </section>
                <section className="flex gap-1 border border-[#e5ccb6] rounded-[10px] p-2 w-[90%] items-center justify-between">
                    <article className="flex gap-1 w-[90%] items-center justify-start">
                        <picture><i className="fi fi-ss-lock text-[#753812] flex"></i></picture>
                        <label htmlFor="senha"></label>
                        <input type="password" className="w-[80%] focus:outline-none" placeholder="Confirmar Senha"/>
                    </article>
                    <picture><i className="fi fi-ss-eye-crossed text-[#753812] flex"></i></picture>
                    <picture className="hidden"><i className="fi fi-sr-eye text-[#753812]"></i></picture>
                </section>
                <section className="w-[90%] flex items-center justify-between">
                    <label htmlFor="remember" className="flex gap-1.5 text-[#753812] text-left text-[.9rem]"><input type="checkbox" className="cursor-pointer accent-[#A65316] w-4" value="Lembrar de mim" />Aceitar termos</label>
                </section>
                <section className="flex w-[90%] gap-4">
                    <button className="bg-[#fdf3e6] border-2 max-w-40 border-[#753812] text-[#753812] font-bold text-[1rem] rounded-3xl px-2 py-1 hover:opacity-65 cursor-pointer flex justify-center gap-2 items-center"><i className="fi fi-sr-arrow-left flex text-[1rem]"></i>Voltar</button>
                    <button className="bg-[#c26918] flex-1 text-white font-bold text-[1rem] px-2 rounded-3xl py-1 hover:opacity-65 cursor-pointer flex justify-center gap-2 items-center"><i className="fi fi-br-check flex text-[1rem]"></i>Cadastrar</button>
                </section>
            </form>
         </section>
    </section>
  )
}

export default TelaCadastro