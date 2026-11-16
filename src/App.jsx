import { useState, useEffect } from 'react'
import './App.css'
import { auth } from './firebase.js'
import { onAuthStateChanged } from 'firebase/auth'
import imagens from './imagens.json' // <--- Importação necessária das imagens

import Header from './components/Header.jsx'
import MenuLateral from './components/MenuLateral.jsx'
import Nav from './components/Nav.jsx'
import NavDesktop from './components/NavDesktop.jsx'

// Importação das telas
import Home from './components/Home.jsx'
import Gourmets from './components/Gourmets.jsx'
import Cakes from './components/Cakes.jsx'
import Bombons from './components/Bombons.jsx'
import Local from './components/Local.jsx'
import About from './components/About.jsx'
import Faq from './components/Faq.jsx'
import Contato from './components/Contato.jsx'
import Orcamento from './components/Orcamento.jsx'
import TelaLogin from './components/TelaLogin.jsx'
import TelaCadastro from './components/TelaCadastro.jsx'
import TelaCadastroDoces from './components/TelaCadastroDoces.jsx'
import TelaAlterarFotoHome from './components/TelaAlterarFotoHome.jsx'

function App() {
  const [paginaAtiva, setPaginaAtiva] = useState('home');
  const [menuAberto, setMenuAberto] = useState(false);
  const [usuarioLogado, setUsuarioLogado] = useState(null);
  
  // Estado para controlar se o Firebase ainda está verificando se há usuário salvo
  const [carregandoAuth, setCarregandoAuth] = useState(true);

  // Estado para armazenar a foto do Hero da Home dinâmica
  const [fotoHeroHome, setFotoHeroHome] = useState(imagens.home.hero);

  // O useEffect roda assim que o app carrega para verificar se já existe um usuário logado
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUsuarioLogado(user);
      } else {
        setUsuarioLogado(null);
      }
      setCarregandoAuth(false);
    });

    return () => unsubscribe();
  }, []);

  const renderizarTela = () => {
    switch (paginaAtiva) {
      case 'home': 
        return (
          <Home 
            onGoToOrcamento={() => setPaginaAtiva('orcamento')} 
            setPaginaAtiva={setPaginaAtiva} 
            fotoHero={fotoHeroHome} 
          />
        );
      case 'gourmets': return <Gourmets usuarioLogado={usuarioLogado} />;
      case 'cakes': return <Cakes usuarioLogado={usuarioLogado} />;
      case 'bombons': return <Bombons usuarioLogado={usuarioLogado} />;
      case 'sobre': return <About />;
      case 'local': return <Local />;
      case 'faq': return <Faq />;
      case 'contato': return <Contato />;
      case 'orcamento': return <Orcamento />;
      case 'cadastroDoces': return <TelaCadastroDoces />;
      case 'alterarFotoHome': 
        return (
          <TelaAlterarFotoHome 
            setPaginaAtiva={setPaginaAtiva} 
            onFotoAtualizada={(novaUrl) => setFotoHeroHome(novaUrl)} 
          />
        );
      case 'login': 
        return (
          <TelaLogin onLoginSucesso={(user) => {
            setUsuarioLogado(user);
            setPaginaAtiva('home');
          }} />
        );
      default: 
        return (
          <Home 
            onGoToOrcamento={() => setPaginaAtiva('orcamento')} 
            setPaginaAtiva={setPaginaAtiva} 
            fotoHero={fotoHeroHome} 
          />
        );
    }
  };

  if (carregandoAuth) {
    return (
      <div className="flex h-screen items-center justify-center bg-[#f9e8d5] text-[#682d03] font-bold text-xl">
        Carregando...
      </div>
    );
  }

  return (
    <section>
      <Header 
        usuarioLogado={usuarioLogado} 
        setPaginaAtiva={setPaginaAtiva}
        onLogout={() => {
          auth.signOut();
          setUsuarioLogado(null);
        }} 
      />

      <MenuLateral 
        menuAberto={menuAberto} 
        setMenuAberto={setMenuAberto} 
        setPaginaAtiva={setPaginaAtiva} 
        usuarioLogado={usuarioLogado}
      />

      <main>
        {renderizarTela()}
      </main>

      <Nav 
        onOpenMenu={() => setMenuAberto(true)} 
        onGoToOrcamento={() => setPaginaAtiva('orcamento')} 
      />
    </section>
  )
}

export default App;