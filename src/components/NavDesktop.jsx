import React from 'react'

const NavDesktop = ({ setPaginaAtiva, usuarioLogado }) => {
  const navegarPara = (pagina) => {
    setPaginaAtiva(pagina);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    /* hidden lg:flex garante que só apareça em Desktop (1024px+) */
    <nav className="hidden lg:flex items-center gap-3 text-[#682d03] font-bold text-[0.9rem] xl:text-[1rem] h-full">
      
      <ul className="flex items-center gap-1 xl:gap-2 w-4/5 lg:flex-wrap lg:justify-center ">
        <li>
          <button onClick={() => navegarPara('home')} className="hover:bg-[#f5a73e] transition-colors cursor-pointer px-2.5 py-1.5 rounded-xl whitespace-nowrap">
            Início
          </button>
        </li>
        <li>
          <button onClick={() => navegarPara('gourmets')} className="hover:bg-[#f5a73e] transition-colors cursor-pointer px-2.5 py-1.5 rounded-xl whitespace-nowrap">
            Gourmets
          </button>
        </li>
        <li>
          <button onClick={() => navegarPara('cakes')} className="hover:bg-[#f5a73e] transition-colors cursor-pointer px-2.5 py-1.5 rounded-xl whitespace-nowrap">
            Bolos
          </button>
        </li>
        <li>
          <button onClick={() => navegarPara('bombons')} className="hover:bg-[#f5a73e] transition-colors cursor-pointer px-2.5 py-1.5 rounded-xl whitespace-nowrap">
            Bombons
          </button>
        </li>
        <li>
          <button onClick={() => navegarPara('sobre')} className="hover:bg-[#f5a73e] transition-colors cursor-pointer px-2.5 py-1.5 rounded-xl whitespace-nowrap">
            Quem somos
          </button>
        </li>
        <li>
          <button onClick={() => navegarPara('local')} className="hover:bg-[#f5a73e] transition-colors cursor-pointer px-2.5 py-1.5 rounded-xl whitespace-nowrap">
            Localização
          </button>
        </li>
        <li>
          <button onClick={() => navegarPara('faq')} className="hover:bg-[#f5a73e] transition-colors cursor-pointer px-2.5 py-1.5 rounded-xl whitespace-nowrap">
            FAQ
          </button>
        </li>
        <li>
          <button onClick={() => navegarPara('contato')} className="hover:bg-[#f5a73e] transition-colors cursor-pointer px-2.5 py-1.5 rounded-xl whitespace-nowrap">
            Contato
          </button>
        </li>
      </ul>

      {/* Botões de Ação */}
      <div className="flex items-center gap-2 shrink-0">
        <button 
          onClick={() => navegarPara('orcamento')} 
          className="bg-[#c26918] text-white font-bold rounded-xl text-[0.9rem] px-3.5 py-1.5 hover:opacity-85 transition-opacity cursor-pointer shadow-sm whitespace-nowrap"
        >
          Orçamento
        </button>

        {!usuarioLogado && (
          <button 
            onClick={() => navegarPara('login')} 
            className="bg-[#c26918] text-white font-bold rounded-xl text-[0.9rem] px-3.5 py-1.5 hover:opacity-85 transition-opacity cursor-pointer shadow-sm flex items-center gap-1.5 whitespace-nowrap"
          >
            <i className="fi fi-sr-sign-in-alt text-xs"></i>Login
          </button>
        )}

        {usuarioLogado && (
          <div className="flex items-center gap-2 border-l border-[#b57335] pl-2 lg:flex-wrap">
            <button 
              onClick={() => navegarPara('cadastroDoces')} 
              className="bg-green-700 text-white text-xs font-bold px-3 py-2 rounded-xl hover:opacity-85 transition-opacity cursor-pointer flex items-center gap-1 shadow-sm whitespace-nowrap"
            >
              <i className="fi fi-sr-add text-xs flex"></i> Doces
            </button>
            
            <button 
              onClick={() => navegarPara('alterarFotoHome')} 
              className="bg-[#c26918] text-white text-xs font-bold px-3 py-2 rounded-xl hover:opacity-85 transition-opacity cursor-pointer flex items-center gap-1 shadow-sm whitespace-nowrap"
            >
              <i className="fi fi-rr-picture text-xs flex"></i> Foto Home
            </button>
          </div>
        )}
      </div>
    </nav>
  )
}

export default NavDesktop