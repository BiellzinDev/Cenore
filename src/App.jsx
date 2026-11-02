import { useState, useEffect } from 'react'
import './App.css'
import { auth } from './firebase.js' // Importe o auth que você configurou
import { onAuthStateChanged } from 'firebase/auth'

import Header from './components/Header.jsx'
import MenuLateral from './components/MenuLateral.jsx'
import Nav from './components/Nav.jsx'

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

function App() {
  const [paginaAtiva, setPaginaAtiva] = useState('home');
  const [menuAberto, setMenuAberto] = useState(false);
  const [usuarioLogado, setUsuarioLogado] = useState(null);
  
  // Estado para controlar se o Firebase ainda está verificando se há usuário salvo
  const [carregandoAuth, setCarregandoAuth] = useState(true);

  // O useEffect roda assim que o app carrega para verificar se já existe um usuário logado no navegador
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        // Usuário está logado (sessão ativa recuperada)
        setUsuarioLogado(user);
      } else {
        // Ninguém logado
        setUsuarioLogado(null);
      }
      setCarregandoAuth(false); // Terminou de verificar
    });

    return () => unsubscribe(); // Limpa o observador ao desmontar
  }, []);

  const renderizarTela = () => {
    switch (paginaAtiva) {
      case 'home': return <Home onGoToOrcamento={() => setPaginaAtiva('orcamento')} setPaginaAtiva={setPaginaAtiva} />;
      case 'gourmets': return <Gourmets usuarioLogado={usuarioLogado} />
      case 'cakes': return <Cakes usuarioLogado={usuarioLogado} />
      case 'bombons': return <Bombons usuarioLogado={usuarioLogado} />
      case 'sobre': return <About />
      case 'local': return <Local />
      case 'faq': return <Faq />
      case 'contato': return <Contato />
      case 'orcamento': return <Orcamento />
      case 'cadastroDoces': return <TelaCadastroDoces />
      case 'login': return <TelaLogin onLoginSucesso={(user) => {
        setUsuarioLogado(user)
        setPaginaAtiva('home')
      }} />
      default: return <Home />
    }
  };

  // Enquanto o Firebase verifica o login, podemos exibir um "carregando" rápido para evitar piscar a tela
  if (carregandoAuth) {
    return (
      <div className="flex h-screen items-center justify-center bg-[#f9e8d5] text-[#682d03] font-bold text-xl">
        Carregando...
      </div>
    );
  }

  return (
    <section className="relative min-h-screen pb-16">
      <Header 
        usuarioLogado={usuarioLogado} 
        onLogout={() => {
          auth.signOut(); // Desconecta do Firebase
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