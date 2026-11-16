import React from 'react';
import imagens from '../imagens.json';

// Adicionamos 'fotoHero' nas propriedades (props). Se ela não for passada, usa a do imagens.json como padrão.
const Home = ({ onGoToOrcamento, setPaginaAtiva, fotoHero }) => {
  const imagemHeroAtual = fotoHero || imagens.home.hero;

  return (
    <section>
        <section className="pb-8">
            <section className="flex w-full justify-center items-center py-4">
                <picture className="flex justify-center items-center text-white w-[90%] max-h-80 relative">
                    <img src={imagemHeroAtual} className="rounded-[1.7rem] w-full object-cover max-h-80" alt="Imagem principal da Confeitaria" />
                    <figcaption className="absolute z-10 w-[47%] text-center font-bold drop-shadow-md">Texturas que derretem e sabores que marcam!</figcaption>
                </picture>
            </section>
            <article className="flex w-full justify-center items-center">
                <button
                  onClick={onGoToOrcamento}
                  className="text-center bg-[#c26918] py-1.5 px-10 rounded-3xl text-white font-bold tracking-[.06rem] cursor-pointer hover:opacity-90 shadow-md"
                >
                  Faça seu pedido!
                </button>
            </article>
            <section className="py-6 flex items-center justify-center">
                <section className="flex items-center justify-center gap-2 w-[90%]">
                    
                    {/* Botão para direcionar para Gourmets */}
                    <article className="flex basis-36 flex-col flex-1 gap-3">
                        <picture className="border-2 border-[#ff9b4e] rounded-xl overflow-hidden shadow-sm">
                            <img src={imagens.home.gourmets} className="h-56 w-full object-cover" alt="Imagem com brigadeiros" />
                        </picture>
                        <button 
                          onClick={() => setPaginaAtiva('gourmets')}
                          className="text-center bg-[#c26918] w-full rounded-3xl py-2 text-white font-bold cursor-pointer hover:opacity-90"
                        >
                          Gourmets
                        </button>
                    </article>

                    {/* Botão para direcionar para Bolos (Cakes) */}
                    <article className="flex basis-36 flex-col flex-1 gap-3">
                        <picture className="border-2 border-[#ff9b4e] rounded-xl overflow-hidden shadow-sm">
                            <img src={imagens.home.bolos} className="h-56 w-full object-cover" alt="Imagem com Bolos" />
                        </picture>
                        <button 
                          onClick={() => setPaginaAtiva('cakes')}
                          className="text-center bg-[#c26918] w-full rounded-3xl py-2 text-white font-bold cursor-pointer hover:opacity-90"
                        >
                          Bolos
                        </button>
                    </article>

                    {/* Botão para direcionar para Bombons */}
                    <article className="flex basis-36 flex-col flex-1 gap-3">
                        <picture className="border-2 border-[#ff9b4e] rounded-xl overflow-hidden shadow-sm">
                            <img src={imagens.home.bombons} className="h-56 w-full object-cover" alt="Imagem com Pão de mel" />
                        </picture>
                        <button 
                          onClick={() => setPaginaAtiva('bombons')}
                          className="text-center bg-[#c26918] w-full rounded-3xl py-2 text-white font-bold cursor-pointer hover:opacity-90"
                        >
                          Bombons
                        </button>
                    </article>

                </section>
            </section>
        </section>
    </section>
  );
};

export default Home;