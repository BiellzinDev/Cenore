import React, { useState, useEffect } from 'react';
import imagens from '../imagens.json';

const Bombons = ({ usuarioLogado }) => {
  const [bombonsPlanilha, setBombonsPlanilha] = useState([]);
  const [bombonsFixosEstado, setBombonsFixosEstado] = useState([
    {
      id: 'paoCenoura',
      nome: 'Pão de Cenoura',
      descricao: 'Massa de cenoura, recheada com brigadeiro gourmet e coberto com chocolate.',
      imagem: imagens.bombons.paoCenoura
    },
    {
      id: 'paoMel',
      nome: 'Pão de Mel',
      descricao: 'Massa artesanal de pão de mel, recheada com doce de leite e coberto com chocolate meio amargo.',
      imagem: imagens.bombons.paoMel
    },
    {
      id: 'paoPistache',
      nome: 'Pistache',
      descricao: 'Bombom artesanal de cenoura com chocolate meio amargo, bolo de cenoura e brigadeiro gourmet de pistache.',
      imagem: imagens.bombons.paoPistache
    },
    {
      id: 'paoLimao',
      nome: 'Limão',
      descricao: 'Bombom artesanal de cenoura com chocolate branco, bolo artesanal e brigadeiro gourmet de limão siciliano ou chocolate branco.',
      imagem: imagens.bombons.paoLimao
    },
    {
      id: 'paoPrestigio',
      nome: 'Prestígio',
      descricao: 'Bombom artesanal de chocolate meio amargo com recheio cremoso de prestígio e massa chiffon de chocolate.',
      imagem: imagens.bombons.paoPrestigio
    },
    {
      id: 'paoMorango',
      nome: 'Morango',
      descricao: 'Casquinha de chocolate meio amargo, com recheio de massa chifon de chocolate, brigadeiro gourmet e geleia artesanal de morango.',
      imagem: imagens.bombons.paoMorango
    }
  ]);
  const [carregando, setCarregando] = useState(true);

  // Estado para armazenar o item que o usuário clicou para remover
  const [itemParaDeletar, setItemParaDeletar] = useState(null);

  // URL do seu Web App do Google Apps Script
  const GOOGLE_SHEETS_URL = 'https://script.google.com/macros/s/AKfycbxodGzHhpYjN3rs-uW8nCaijFBsWtrtV9wFGg-tJ-g-4ej3gBEkfZEIMfEx6kDa2vr-gw/exec';

  useEffect(() => {
    fetch(GOOGLE_SHEETS_URL)
      .then((res) => res.json())
      .then((data) => {
        const bombonsFiltrados = data.filter((item) => item.categoria === 'bombons');
        setBombonsPlanilha(bombonsFiltrados);
        setCarregando(false);
      })
      .catch((err) => {
        console.error('Erro ao buscar bombons do Sheets:', err);
        setCarregando(false);
      });
  }, []);

  // Abre o modal de confirmação salvando o bombom selecionado
  const abrirModalDeletar = (bombom) => {
    setItemParaDeletar(bombom);
  };

  // Executa a exclusão após o clique em "Sim" no modal
  const confirmarExclusao = async () => {
    if (!itemParaDeletar) return;

    const bombom = itemParaDeletar;

    // Se for um item fixo do JSON
    if (typeof bombom.id === 'string' && !Number(bombom.id)) {
      setBombonsFixosEstado((prev) => prev.filter((b) => b.id !== bombom.id));
      setItemParaDeletar(null);
      return;
    }

    try {
      await fetch(GOOGLE_SHEETS_URL, {
        method: 'POST',
        mode: 'no-cors',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          action: 'delete',
          id: bombom.id,
          nome: bombom.nome
        }),
      });

      setBombonsPlanilha((prev) => prev.filter((b) => b.id !== bombom.id));
      setItemParaDeletar(null);
    } catch (error) {
      console.error('Erro ao remover bombom:', error);
      setItemParaDeletar(null);
    }
  };

  const listaBombons = [...bombonsFixosEstado, ...bombonsPlanilha];

  return (
    <section className="py-8 pb-20 relative">
        {/* Modal de confirmação flutuante (exibido apenas quando um item for selecionado) */}
        {itemParaDeletar && (
          <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center p-4">
            <span className='flex flex-col max-w-60 items-center justify-center bg-[#fff1df] py-4 px-6 gap-4 rounded-2xl border-2 border-[#c26918] shadow-2xl animate-fade-in'>
                <p className="text-[#753812] font-semibold text-center">
                  Deseja remover "{itemParaDeletar.nome}"?
                </p>
                <article className='flex items-center justify-between gap-4 w-full'>
                    <button 
                      onClick={confirmarExclusao}
                      className='text-center bg-lime-600 text-white py-2 flex-1 rounded-2xl cursor-pointer hover:opacity-80 font-bold'
                    >
                      Sim
                    </button>
                    <button 
                      onClick={() => setItemParaDeletar(null)}
                      className='text-center bg-[#d8000a] text-white flex-1 py-2 rounded-2xl cursor-pointer hover:opacity-80 font-bold'
                    >
                      Não
                    </button>
                </article>
            </span>
          </div>
        )}

        <section className="w-full flex flex-col text-center justify-center items-center">
            <h2 className="bg-[#c26918] w-1/2 text-white font-bold rounded-2xl py-2">Bombons</h2>
            <section className="py-4 w-full flex justify-center items-center">
                <section className="w-[90%] flex flex-col justify-center items-center gap-6">
                    
                    {listaBombons.map((bombom, index) => {
                      const isReverso = index % 2 !== 0;

                      return (
                        <article 
                          key={bombom.id || index} 
                          className={`relative flex ${isReverso ? 'flex-row-reverse items-start' : ''} flex-1 w-full items-start`}
                        >
                            {/* Botão de remover visível apenas se o usuário estiver logado */}
                            {usuarioLogado && (
                              <span className='absolute flex items-center justify-center top-[-8%] text-[#d8000a] text-2xl bg-white rounded-full z-10'>
                                <button 
                                  type="button"
                                  onClick={() => abrirModalDeletar(bombom)}
                                  className="cursor-pointer border-none bg-transparent"
                                  title="Remover bombom"
                                >
                                  <i className="fi fi-sr-circle-xmark flex items-center justify-center w-5 rounded-full"></i>
                                </button>
                              </span>
                            )}

                            <picture className="flex basis-44 h-32 shrink-0">
                                <img 
                                  src={bombom.imagem} 
                                  className="border-2 border-[#ff9b4e] w-full h-full object-cover rounded-xl" 
                                  alt={bombom.nome} 
                                />
                            </picture>
                            <article className={`justify-self-end flex-1 ${isReverso ? 'text-right' : 'text-left'} flex flex-col gap-2`}>
                                <h3 className={`bg-[#c26918] w-full text-white font-bold ${isReverso ? 'rounded-l-2xl pr-2' : 'rounded-r-2xl pl-2'} py-2`}>
                                  {bombom.nome}
                                </h3>
                                
                                <div 
                                  className={`${isReverso ? 'pr-2' : 'pl-2'} text-[#78401F] text-sm`}
                                  dangerouslySetInnerHTML={{ __html: bombom.descricao }}
                                />
                            </article>
                        </article>
                      );
                    })}

                </section>
            </section>
        </section>
    </section>
  );
};

export default Bombons;