import React, { useState, useEffect } from 'react';
import imagens from '../imagens.json';

const Gourmets = ({ usuarioLogado }) => {
  const [gourmetsPlanilha, setGourmetsPlanilha] = useState([]);
  const [gourmetsFixosEstado, setGourmetsFixosEstado] = useState([
    {
      id: 'brigadeiros',
      nome: 'Brigadeiros',
      descricao: '<ul><li>Brigadeiro Gourmet</li><li>Brigadeiro de Café</li><li>Brigadeiro de limão Siciliano</li><li>Beijinho</li><li>Ninho</li><li>Ninho com Uva</li><li>Trufa de Tamarâ</li></ul>',
      imagem: imagens.gourmets.brigadeiros
    },
    {
      id: 'torta',
      nome: 'Tortinhas',
      descricao: '<ul><li>Morango</li><li>Limão</li><li>Banoffe</li></ul>',
      imagem: imagens.gourmets.torta
    },
    {
      id: 'cupCake',
      nome: 'Cup Cake',
      descricao: '<ul><li>Chocolate com brigadeiro de café</li><li>Churros</li></ul>',
      imagem: imagens.gourmets.cupCake
    },
    {
      id: 'pudim',
      nome: 'Pudim Gourmet',
      descricao: '<ul><li>Leite Condensado</li><li>Café</li></ul>',
      imagem: imagens.gourmets.pudim
    },
    {
      id: 'eclair',
      nome: 'Eclair',
      descricao: 'Delicada massa choux leve e crocante, recheada com suave creme de chocolate',
      imagem: imagens.gourmets.eclair
    },
    {
      id: 'brownie',
      nome: 'Brownie',
      descricao: '<ul><li>Tradicional</li><li>Café</li></ul>',
      imagem: imagens.gourmets.brownie
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
        // Filtra apenas os itens da categoria "gourmets" vindos da planilha
        const gourmetsFiltrados = data.filter((item) => item.categoria === 'gourmets');
        setGourmetsPlanilha(gourmetsFiltrados);
        setCarregando(false);
      })
      .catch((err) => {
        console.error('Erro ao buscar gourmets do Sheets:', err);
        setCarregando(false);
      });
  }, []);

  // Abre o modal de confirmação salvando o bombom selecionado
  const abrirModalDeletar = (gourmet) => {
    setItemParaDeletar(gourmet);
  };

  // Executa a exclusão após o clique em "Sim" no modal
  const confirmarExclusao = async () => {
    if (!itemParaDeletar) return;

    const gourmet = itemParaDeletar;

    // Se for um item fixo do JSON
    if (typeof gourmet.id === 'string' && !Number(gourmet.id)) {
      setGourmetsFixosEstado((prev) => prev.filter((b) => b.id !== gourmet.id));
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
          id: gourmet.id,
          nome: gourmet.nome
        }),
      });

      setGourmetsPlanilha((prev) => prev.filter((b) => b.id !== gourmet.id));
      setItemParaDeletar(null);
    } catch (error) {
      console.error('Erro ao remover bombom:', error);
      setItemParaDeletar(null);
    }
  };

  const listaGourmets = [...gourmetsFixosEstado, ...gourmetsPlanilha];

  return (
    <section className="py-8 pb-20">
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
            <h2 className="bg-[#c26918] w-1/2 text-white font-bold rounded-2xl py-2">Doces Gourmet</h2>
            <section className="py-4 w-full flex justify-center items-center">
                <section className="w-[90%] flex flex-col justify-center items-center gap-6">
                    
                    {listaGourmets.map((gourmet, index) => {
                      // Alterna a orientação (par para a esquerda, ímpar para a direita com flex-row-reverse)
                      const isReverso = index % 2 !== 0;

                      return (
                        <article 
                          key={gourmet.id || index} 
                          className={`relative flex ${isReverso ? 'flex-row-reverse items-start' : ''} flex-1 w-full items-start`}
                        >
                            {/* Botão de remover visível apenas se o usuário estiver logado */}
                            {usuarioLogado && (
                              <span className='absolute flex items-center justify-center top-[-8%] text-[#d8000a] text-2xl bg-white rounded-full z-10'>
                                <button 
                                  type="button"
                                  onClick={() => abrirModalDeletar(gourmet)}
                                  className="cursor-pointer border-none bg-transparent"
                                  title="Remover item"
                                >
                                  <i className="fi fi-sr-circle-xmark flex items-center justify-center w-5 rounded-full"></i>
                                </button>
                              </span>
                            )}

                            <picture className="flex basis-44 h-32 shrink-0">
                                <img 
                                  src={gourmet.imagem} 
                                  className="border-2 border-[#ff9b4e] w-full h-full object-cover" 
                                  alt={gourmet.nome} 
                                />
                            </picture>
                            <article className={`justify-self-end flex-1 ${isReverso ? 'text-right' : 'text-left'} flex flex-col gap-2`}>
                                <h3 className={`bg-[#c26918] w-full text-white font-bold ${isReverso ? 'rounded-l-2xl pr-2' : 'rounded-r-2xl pl-2'} py-2`}>
                                  {gourmet.nome}
                                </h3>
                                
                                {/* Renderiza a descrição (suporta listas HTML e texto rico do Tiptap) */}
                                <div 
                                  className={`${isReverso ? 'pr-2' : 'pl-2'} text-[#78401F] text-sm`}
                                  dangerouslySetInnerHTML={{ __html: gourmet.descricao }}
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

export default Gourmets;