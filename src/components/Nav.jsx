import React from 'react';

// Recebemos as funções via props desestruturadas
const Nav = ({ onOpenMenu, onGoToOrcamento }) => {
  return (
    <nav className="fixed bottom-0 w-full flex justify-center items-center bg-[#682d03] h-12 z-20">
      {/* Botão para ir direto para a tela de Orçamento */}
      <section>
        <button 
          onClick={onGoToOrcamento}
          className="text-white font-bold text-[1.2rem] cursor-pointer"
        >
          Faça seu pedido!
        </button>
      </section>
      
      {/* Botão hambúrguer para abrir o menu lateral */}
      <button 
        onClick={onOpenMenu}
        className="bg-[#fff1df] border-2 border-[#682d03] flex items-center justify-center rounded-full font-semibold text-3xl absolute right-[-4%] cursor-pointer"
      >
        <i className="flex fi fi-sr-menu-burger py-4 px-5"></i>
      </button>
    </nav>
  );
}

export default Nav;