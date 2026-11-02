import React, { useState, useEffect } from 'react';
import imagens from '../imagens.json';

const Cakes = ({ usuarioLogado }) => {
  const [bolosPlanilha, setBolosPlanilha] = useState([]);
  const [bolosFixosEstado, setBolosFixosEstado] = useState([
    {
      id: 'nozes',
      nome: 'Nozes',
      descricao: 'Massa branca artesanal com creme belga, nozes e ganache de chocolate. Cremoso, sofisticado e irresistível.',
      imagem: imagens.bolos.nozes
    },
    {
      id: 'prestigio',
      nome: 'Prestígio',
      descricao: 'Massa chiffon de chocolate com recheio cremoso de prestígio, cobertura de brigadeiro, coco e beijinhos. Intenso, cremoso e irresistível.',
      imagem: imagens.bolos.prestigio
    },
    {
      id: 'frutasVermelhas',
      nome: 'Frutas Vermelhas',
      descricao: 'Massa branca com creme belga, geleia artesanal de frutas vermelhas e cobertura de chantilly. Leve e delicado.',
      imagem: imagens.bolos.frutasVermelhas
    },
    {
      id: 'frutasAmarelas',
      nome: 'Frutas Amarelas',
      descricao: 'Massa branca com creme belga e geleia artesanal de manga, abacaxi e maracujá. Tropical, leve e refrescante.',
      imagem: imagens.bolos.frutasAmarelas
    },
    {
      id: 'cenouraBrigadeiro',
      nome: 'Cenoura com Brigadeiro',
      descricao: 'Massa artesanal de cenoura recheada e coberta com brigadeiro Gourmet.',
      imagem: imagens.bolos.cenouraBrigadeiro
    },
    {
      id: 'doceAmeixa',
      nome: 'Doce de leite com Ameixa',
      descricao: 'Massa chiffon branca, com recheio de doce de leite artesanal e ameixas secas. Coberto com doce de leite artesanal.',
      imagem: imagens.bolos.doceAmeixa
    }
  ]);
   const [carregando, setCarregando] = useState(true);

   // Estado para armazenar o item que o usuário clicou para remover
   const [itemParaDeletar, setItemParaDeletar] = useState(null);

   // URL do seu Web App do Google Apps Script
  const GOOGLE_SHEETS_URL = 'https://script.google.com/macros/s/AKfycbxodGzHhpYjN3rs-uW8nCaijFBsWtrtV9wFGg-tJ-g-4ej3gBEkfZEIMfEx6kDa2vr-gw/exec';

  const buscarBolos = () => {
    fetch(GOOGLE_SHEETS_URL)
      .then((res) => res.json())
      .then((data) => {
        const bolosFiltrados = data.filter((item) => item.categoria === 'bolos');
        setBolosPlanilha(bolosFiltrados);
        setCarregando(false);
      })
      .catch((err) => {
        console.error('Erro ao buscar bolos do Sheets:', err);
        setCarregando(false);
      });
  };

  useEffect(() => {
    buscarBolos();
  }, []);

  // Abre o modal de confirmação salvando o bombom selecionado
  const abrirModalDeletar = (bolo) => {
    setItemParaDeletar(bolo);
  };

  // Executa a exclusão após o clique em "Sim" no modal
  const confirmarExclusao = async () => {
    if (!itemParaDeletar) return;

    const bolo = itemParaDeletar;

    // Se for um item fixo do JSON
    if (typeof bolo.id === 'string' && !Number(bolo.id)) {
      setBolosFixosEstado((prev) => prev.filter((b) => b.id !== bolo.id));
      setItemParaDeletar(null);
      return;
    }

    try {
      await fetch(GOOGLE_SHEETS_URL, {
        method: 'POST', // Essencial para o doPost aceitar
        mode: 'no-cors',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          action: 'delete',
          id: bolo.id,
          nome: bolo.nome
        }),
      });

      setBolosPlanilha((prev) => prev.filter((b) => b.id !== bolo.id));
      setItemParaDeletar(null);
    } catch (error) {
      console.error('Erro ao remover o bolo:', error);
      setItemParaDeletar(null);
    }
  };

  const listaBolos = [...bolosFixosEstado, ...bolosPlanilha];

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
            <h2 className="bg-[#c26918] w-1/2 text-white font-bold rounded-2xl py-2">Bolos</h2>
            <section className="py-4 w-full flex justify-center items-center">
                <section className="w-[90%] flex flex-col justify-center items-center gap-6">
                    
                    {listaBolos.map((bolo, index) => {
                      const isReverso = index % 2 !== 0;

                      return (
                        <article 
                          key={bolo.id || index} 
                          className={`relative flex ${isReverso ? 'flex-row-reverse items-start' : ''} flex-1 w-full items-start`}
                        >
                            {usuarioLogado && (
                              <span className='absolute flex items-center justify-center top-[-8%] text-[#d8000a] text-2xl bg-white rounded-full z-10'>
                                <button 
                                  type="button"
                                  onClick={() => abrirModalDeletar(bolo)}
                                  className="cursor-pointer border-none bg-transparent"
                                  title="Remover bolo"
                                >
                                  <i className="fi fi-sr-circle-xmark flex items-center justify-center w-5 rounded-full"></i>
                                </button>
                              </span>
                            )}

                            <picture className="flex basis-44 h-32 shrink-0">
                                <img 
                                  src={bolo.imagem} 
                                  className="border-2 border-[#ff9b4e] w-full h-full object-cover" 
                                  alt={bolo.nome} 
                                />
                            </picture>
                            <article className={`justify-self-end flex-1 ${isReverso ? 'text-right' : 'text-left'} flex flex-col gap-2`}>
                                <h3 className={`bg-[#c26918] w-full text-white font-bold ${isReverso ? 'rounded-l-2xl pr-2' : 'rounded-r-2xl pl-2'} py-2`}>
                                  {bolo.nome}
                                </h3>
                                
                                <div 
                                  className={`${isReverso ? 'pr-2' : 'pl-2'} text-[#78401F] text-sm`}
                                  dangerouslySetInnerHTML={{ __html: bolo.descricao }}
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

export default Cakes;