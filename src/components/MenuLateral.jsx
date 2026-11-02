import React from 'react';

// Recebemos o 'usuarioLogado' via props junto com as outras funções
const MenuLateral = ({ menuAberto, setMenuAberto, setPaginaAtiva, usuarioLogado }) => {
  const navegarPara = (pagina) => {
    setPaginaAtiva(pagina);
    setMenuAberto(false); // Fecha o menu ao clicar
  };

  return (
    <nav className={`fixed right-0 top-0 rounded-l-4xl h-full bg-[#fff1df] w-3/5 z-50 gap-4 items-center justify-start flex-col transition-transform py-2 duration-300 ${menuAberto ? 'flex' : 'hidden'}`}>
      
      {/* Botão para fechar */}
      <button 
        onClick={() => setMenuAberto(false)}
        className="flex items-center justify-end pt-3 w-[80%] text-xl font-bold text-[#682d03] cursor-pointer"
      >
        ✕
      </button>

      <ul className="flex flex-col justify-center py-1 gap-1 text-[1.2rem] font-bold text-[#682d03] w-4/5">
        <li onClick={() => navegarPara('home')} className="hover:bg-white cursor-pointer p-2 rounded-2xl">Inicio</li>
        <li onClick={() => navegarPara('gourmets')} className="hover:bg-white cursor-pointer p-2 rounded-2xl">Doces Gourmets</li>
        <li onClick={() => navegarPara('cakes')} className="hover:bg-white cursor-pointer p-2 rounded-2xl">Bolos</li>
        <li onClick={() => navegarPara('bombons')} className="hover:bg-white cursor-pointer p-2 rounded-2xl">Bombons</li>
        <li onClick={() => navegarPara('sobre')} className="hover:bg-white cursor-pointer p-2 rounded-2xl">Quem somos</li>
        <li onClick={() => navegarPara('local')} className="hover:bg-white cursor-pointer p-2 rounded-2xl">Localização</li>
        <li onClick={() => navegarPara('faq')} className="hover:bg-white cursor-pointer p-2 rounded-2xl">Faq</li>
        <li onClick={() => navegarPara('contato')} className="hover:bg-white cursor-pointer p-2 rounded-2xl">Contato</li>
        <li onClick={() => navegarPara('orcamento')} className="hover:bg-white cursor-pointer p-2 rounded-2xl">Orçamento</li>
      </ul>

      <button onClick={() => navegarPara('orcamento')} className="bg-[#c26918] text-white font-bold rounded-3xl text-[1.2rem] py-2 w-[75%] hover:opacity-65 cursor-pointer">Orçamento</button>

      {/* Botão Dinâmico: Se estiver logado, vira "Cadastrar Bolos". Senão, continua "Login" */}
      {usuarioLogado ? (
        <button 
          onClick={() => navegarPara('cadastroDoces')} 
          className="bg-green-700 text-white font-bold text-[1.1rem] rounded-3xl py-2 w-[75%] hover:opacity-80 cursor-pointer flex justify-center gap-2 items-center"
        >
          <i className="fi fi-sr-add flex text-[1rem]"></i>Cadastrar Bolos
        </button>
      ) : (
        <button 
          onClick={() => navegarPara('login')} 
          className="bg-[#c26918] text-white font-bold text-[1.2rem] rounded-3xl py-2 w-[75%] hover:opacity-65 cursor-pointer flex justify-center gap-2 items-center"
        >
          <i className="fi fi-sr-sign-in-alt flex text-[1rem]"></i>Login
        </button>
      )}
    </nav>
  );
};

export default MenuLateral;