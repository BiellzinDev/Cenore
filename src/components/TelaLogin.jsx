import React, { useState } from 'react'
import { auth } from '../firebase.js'
import { signInWithEmailAndPassword } from 'firebase/auth'
import imagens from '../imagens.json'

const imgFundo = './public/fundo-login.webp'
const imgCadeadoLogin = './public/cadeado-login.webp'
const imgLogoLogin = './public/cenore-login.webp'
const cakeLogin = './public/cake-login.webp'

// 1. Recebemos a função 'onLoginSucesso' via props
const TelaLogin = ({ onLoginSucesso }) => {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [erro, setErro] = useState('');
  const [carregando, setCarregando] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setErro('');
    setCarregando(true);

    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, senha);
      console.log('Logado com sucesso:', userCredential.user);
      
      // 2. Avisamos o App.jsx que o login foi bem-sucedido, passando o usuário
      if (onLoginSucesso) {
        onLoginSucesso(userCredential.user);
      }
      
    } catch (error) {
      console.error('Erro de login:', error.code);
      if (error.code === 'auth/invalid-credential' || error.code === 'auth/user-not-found' || error.code === 'auth/wrong-password') {
        setErro('E-mail ou senha incorretos.');
      } else if (error.code === 'auth/invalid-email') {
        setErro('E-mail inválido.');
      } else {
        setErro('Erro ao fazer login. Tente novamente.');
      }
    } finally {
      setCarregando(false);
    }
  };

  return (
    <section className="w-full relative h-screen flex justify-center items-start overflow-y-hidden">
        <picture className="h-screen w-full">
            <img src={imagens.login.fundo} className="w-full h-full object-cover" alt="Imagem de fundo da tela de login com brigadeiro" />
        </picture>
        
        <section className="absolute bg-[#fdf3e6] w-[85%] py-4 mt-12 rounded-4xl px-2 shadow-lg">
            <form onSubmit={handleLogin} className="flex flex-col items-center justify-center gap-3">
                <picture className="flex items-center justify-center"><img src={imagens.login.logo} alt="Logo Cenore Login" /></picture>
                <picture className="flex items-center justify-center"><img src={imagens.login.cadeado} alt="Imagem com cadeado" /></picture>
                
                <article className="flex flex-col items-center justify-center">
                    <h2 className="font-bold text-[1.2rem] text-[#753812]">Acesso Administrativo</h2>
                    <p className="text-center w-50 text-[.75rem] text-[#753812] font-medium">Faça login para gerenciar seus doces e informações da loja</p>
                </article>

                {erro && <span className="text-red-600 text-xs font-bold text-center">{erro}</span>}

                <section className="flex gap-1 border border-[#e5ccb6] rounded-[10px] p-2 w-[90%] items-center justify-start bg-white">
                    <picture className="flex items-center justify-center"><i className="fi fi-ss-user text-[#753812] flex"></i></picture>
                    <input 
                      type="email" 
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-[90%] focus:outline-none bg-transparent" 
                      placeholder="E-mail" 
                      required
                    />
                </section>

                <section className="flex gap-1 border border-[#e5ccb6] rounded-[10px] p-2 w-[90%] items-center justify-between bg-white">
                    <article className="flex gap-1 w-[90%] items-center justify-start">
                        <picture><i className="fi fi-ss-lock text-[#753812] flex"></i></picture>
                        <input 
                          type="password" 
                          value={senha}
                          onChange={(e) => setSenha(e.target.value)}
                          className="w-[80%] focus:outline-none bg-transparent" 
                          placeholder="Senha"
                          required
                        />
                    </article>
                    <picture><i className="fi fi-ss-eye-crossed text-[#753812] flex cursor-pointer"></i></picture>
                </section>

                <section className="w-[90%] flex items-center justify-between">
                    <label htmlFor="remember" className="flex gap-1.5 text-[#753812] text-left text-[.9rem]">
                      <input type="checkbox" className="cursor-pointer accent-[#A65316] w-4" />lembrar de mim
                    </label>
                    <a href="#" className="text-[.7rem] text-[#753812] underline font-semibold hover:opacity-75">Esqueceu a senha?</a>
                </section>

                <button 
                  type="submit" 
                  disabled={carregando}
                  className="bg-[#c26918] text-white font-bold text-[1.2rem] rounded-3xl py-1 w-[90%] hover:opacity-65 cursor-pointer flex justify-center gap-2 items-center disabled:opacity-50"
                >
                  <i className="fi fi-sr-sign-in-alt flex text-[1rem]"></i>
                  {carregando ? 'Entrando...' : 'Login'}
                </button>

                <picture className="flex items-center justify-center w-[90%]">
                    <img src={imagens.login.cake} alt="Imagem com docinho" className="w-full" />
                </picture>

                <section className="flex w-[90%] text-[.8rem] text-[#753812] items-center justify-between text-left">
                    <p>Você ainda não tem uma conta?</p>
                    <a href="#" className="font-bold underline">Cadastrar usuário</a>
                </section>
            </form>
         </section>
    </section>
  )
}

export default TelaLogin;