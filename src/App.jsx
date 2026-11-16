import { useState, useEffect } from 'react'
import './App.css'
import { auth } from './firebase.js'
import { onAuthStateChanged } from 'firebase/auth'

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
  const [carregandoAuth, setCarregandoAuth] = useState(true);

  // Inicializa os estados buscando do localStorage (para não sumir ao dar F5)
  const [fotoHeroHome, setFotoHeroHome] = useState(() => {
    return localStorage.getItem('fotoHeroHome') || '';
  });
  
  const [mensagemHeroHome, setMensagemHeroHome] = useState(() => {
    return localStorage.getItem('mensagemHeroHome') || '';
  });

  // URL do seu Web App do Google Apps Script
  const GOOGLE_SHEETS_URL = 'https://script.google.com/macros/s/AKfycbxodGzHhpYjN3rs-uW8nCaijFBsWtrtV9wFGg-tJ-g-4ej3gBEkfZEIMfEx6kDa2vr-gw/exec';

  // Verifica se há usuário logado pelo Firebase
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

  // Busca a configuração mais atualizada da Home (foto e mensagem) do Google Sheets ao carregar
  useEffect(() => {
    fetch(GOOGLE_SHEETS_URL)
      .then((res) => res.json())
      .then((data) => {
        const homeConfig = data.find((item) => item.tipo === 'foto_home');
        if (homeConfig) {
          if (homeConfig.imagem) {
            setFotoHeroHome(homeConfig.imagem);
            localStorage.setItem('fotoHeroHome', homeConfig.imagem);
          }
          if (homeConfig.mensagem !== undefined) {
            setMensagemHeroHome(homeConfig.mensagem);
            localStorage.setItem('mensagemHeroHome', homeConfig.mensagem);
          }
        }
      })
      .catch((err) => {
        console.error('Erro ao buscar configuração da home do Sheets:', err);
      });
  }, []);

  const renderizarTela = () => {
    switch (paginaAtiva) {
      case 'home': 
        return (
          <Home 
            onGoToOrcamento={() => setPaginaAtiva('orcamento')} 
            setPaginaAtiva={setPaginaAtiva} 
            fotoHero={fotoHeroHome}
            mensagemHero={mensagemHeroHome} 
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
            onFotoAtualizada={(novaUrl, novaMensagem) => {
              if (novaUrl) {
                setFotoHeroHome(novaUrl);
                localStorage.setItem('fotoHeroHome', novaUrl);
              }
              setMensagemHeroHome(novaMensagem);
              localStorage.setItem('mensagemHeroHome', novaMensagem);
            }} 
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
            mensagemHero={mensagemHeroHome} 
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