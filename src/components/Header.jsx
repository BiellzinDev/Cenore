import imagens from '../imagens.json'
import NavDesktop from './NavDesktop'

// 1. Adicione setPaginaAtiva aqui nas chaves das props:
const Header = ({ usuarioLogado, onLogout, setPaginaAtiva }) => {
  return (
    <header className="bg-[#fdba5f] h-28 flex items-center justify-center sticky top-0 z-30 shadow-md">
        <section className="flex items-center justify-around w-full px-4 h-full lg:gap-2">
            <picture className='cursor-pointer' onClick={() => setPaginaAtiva('home')}>
                <img src={imagens.header.logoPrincipal} className="w-40 md:w-50" alt="Logo Cenore" />
            </picture>
            
            {/* Agora o Header tem a função para repassar ao NavDesktop */}
            <NavDesktop setPaginaAtiva={setPaginaAtiva} usuarioLogado={usuarioLogado} />
            
            <div className="flex items-center gap-4">
                {usuarioLogado ? (
                  <div className="flex items-center gap-2 bg-[#fff1df] text-[#682d03] px-3 py-1.5 rounded-full text-sm font-bold shadow">
                    <span>Admin</span>
                    <button 
                      onClick={onLogout} 
                      className="text-xs bg-red-600 text-white px-2 py-1 rounded-md cursor-pointer hover:opacity-80"
                    >
                      Sair
                    </button>
                  </div>
                ) : (
                  <article className="flex gap-3 text-2xl md:text-3xl font-bold text-[#682d03] lg:flex-col">
                      <a href="#" className="hover:opacity-75 transition-opacity"><i className="fi fi-brands-whatsapp"></i></a>
                      <a href="https://www.instagram.com/cenoreconfeitaria?exln=Z2V4ejh0YTRzaTdy" target='_blank' className="hover:opacity-75 transition-opacity"><i className="fi fi-brands-instagram"></i></a>
                  </article>
                )}
            </div>
        </section>
    </header>
  )
}

export default Header