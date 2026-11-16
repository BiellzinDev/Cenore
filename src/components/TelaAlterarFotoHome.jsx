import React, { useState } from 'react';
import imagens from '../imagens.json';

// Recebemos a função 'onFotoAtualizada' via props
const TelaAlterarFotoHome = ({ setPaginaAtiva, onFotoAtualizada }) => {
  const [imagemFile, setImagemFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(imagens.home.hero);
  const [mensagemHome, setMensagemHome] = useState(''); // <--- Estado para a mensagem opcional na Home
  const [carregando, setCarregando] = useState(false);
  const [mensagemSucesso, setMensagemSucesso] = useState('');
  const [mensagemErro, setMensagemErro] = useState('');

  // Credenciais do Cloudinary e Google Sheets
  const CLOUD_NAME = 'eas3rbfj';
  const UPLOAD_PRESET = 'rwmskpok';
  const GOOGLE_SHEETS_URL = 'https://script.google.com/macros/s/AKfycbxodGzHhpYjN3rs-uW8nCaijFBsWtrtV9wFGg-tJ-g-4ej3gBEkfZEIMfEx6kDa2vr-gw/exec';

  const TAMANHO_MAXIMO_BYTES = 10 * 1024 * 1024; // 10MB em bytes

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > TAMANHO_MAXIMO_BYTES) {
        setMensagemErro('Tamanho limite de imagem ultrapassado');
        e.target.value = '';
        return;
      }

      setImagemFile(file);
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMensagemSucesso('');

    // Permite salvar se houver uma nova imagem OU se o admin digitou uma mensagem
    if (!imagemFile && !mensagemHome.trim()) {
      setMensagemErro('Selecione uma nova imagem ou digite uma mensagem para atualizar.');
      return;
    }

    setCarregando(true);

    try {
      let imageUrl = '';

      // 1. PASSO: Upload da imagem para o Cloudinary (apenas se uma nova imagem foi selecionada)
      if (imagemFile) {
        const formData = new FormData();
        formData.append('file', imagemFile);
        formData.append('upload_preset', UPLOAD_PRESET);

        const cloudinaryRes = await fetch(
          `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`,
          {
            method: 'POST',
            body: formData,
          }
        );

        const cloudinaryData = await cloudinaryRes.json();
        imageUrl = cloudinaryData.secure_url;

        if (!imageUrl) {
          throw new Error('Falha ao enviar a imagem para o Cloudinary.');
        }
      }

      // 2. PASSO: Enviar os dados (imagem e/ou mensagem) para o Google Sheets
      const bannerData = {
        tipo: 'foto_home',
        ...(imageUrl && { imagem: imageUrl }),
        mensagem: mensagemHome.trim(),
      };

      await fetch(GOOGLE_SHEETS_URL, {
        method: 'POST',
        mode: 'no-cors',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(bannerData),
      });

      // 3. ATUALIZAÇÃO IMEDIATA NO APP: Passa a URL da foto e a mensagem para o App.jsx
      if (onFotoAtualizada) {
        onFotoAtualizada(imageUrl || null, mensagemHome.trim());
      }

      setMensagemSucesso('Home atualizada com sucesso!');
      setImagemFile(null);

      // Volta para a home automaticamente após 2 segundos de sucesso
      setTimeout(() => {
        setMensagemSucesso('');
        if (setPaginaAtiva) setPaginaAtiva('home');
      }, 2000);

    } catch (error) {
      console.error('Erro ao atualizar a home:', error);
      setMensagemErro('Ocorreu um erro ao salvar as alterações. Tente novamente.');
    } finally {
      setCarregando(false);
    }
  };

  return (
    <section className="w-full relative h-screen flex justify-center items-start overflow-hidden md:h-[calc(100vh-7rem)]">
      {/* Modal flutuante centralizado de sucesso */}
      {mensagemSucesso && (
        <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center p-4">
          <div className="flex flex-col max-w-64 w-full items-center justify-center bg-[#fff1df] py-6 px-6 gap-4 rounded-2xl border-2 border-[#c26918] shadow-2xl animate-fade-in">
            <span className="flex items-center justify-center w-12 h-12 rounded-full bg-lime-600 text-white text-2xl">
              <i className="fi fi-sr-check flex"></i>
            </span>
            <p className="text-[#753812] font-bold text-center text-lg">
              {mensagemSucesso}
            </p>
          </div>
        </div>
      )}

      {/* Modal flutuante centralizado de erro / limite de tamanho */}
      {mensagemErro && (
        <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center p-4">
          <div className="flex flex-col max-w-72 w-full items-center justify-center bg-[#fff1df] py-6 px-6 gap-4 rounded-2xl border-2 border-[#d8000a] shadow-2xl animate-fade-in">
            <span className="flex items-center justify-center w-12 h-12 rounded-full bg-[#d8000a] text-white text-2xl">
              <i className="fi fi-sr-exclamation flex"></i>
            </span>
            <p className="text-[#753812] font-bold text-center text-lg">
              {mensagemErro}
            </p>
            <button
              type="button"
              onClick={() => setMensagemErro('')}
              className="text-center bg-[#d8000a] text-white py-2 px-6 rounded-2xl cursor-pointer hover:opacity-80 font-bold w-full"
            >
              Entendi
            </button>
          </div>
        </div>
      )}

      <picture className="absolute inset-0 w-full h-full z-0">
        <img 
          src={imagens.login.fundo} 
          className="w-full h-full object-cover" 
          alt="Imagem de fundo com brigadeiro" 
        />
      </picture>
      
      <section className="bg-[#fdf3e6] w-[85%] max-w-2xl max-h-140 overflow-y-auto pb-8 mt-12 py-4 rounded-4xl px-2 z-20 shadow-xl">
        <form onSubmit={handleSubmit} className="flex flex-col items-center justify-center gap-4">
          
          {/* Cabeçalho */}
          <section className="flex w-[90%] items-center justify-start gap-3">
            <picture className="flex items-center justify-center text-[#753812] text-4xl">
              <i className="fi fi-rr-picture flex"></i>
            </picture>
            <article className="flex flex-col items-start justify-start">
              <h2 className="font-bold w-full text-left text-[1.2rem] text-[#753812]">Atualizar Tela Inicial</h2>
              <p className="text-left text-[.75rem] text-[#753812] font-medium">Altere a imagem principal ou adicione uma mensagem de destaque na página inicial.</p>
            </article>
          </section>

          {/* Campo de Mensagem Opcional */}
          <section className="w-[90%] flex flex-col gap-1">
            <label htmlFor="mensagem-home" className="text-left w-full text-[1rem] text-[#753812] font-bold">
              Mensagem na Home <span className="text-xs font-normal text-[#78401F]">(Opcional)</span>
            </label>
            <section className="flex gap-1 border border-[#e5ccb6] rounded-[10px] p-2 items-center justify-start bg-white">
              <input
                type="text"
                id="mensagem-home"
                value={mensagemHome}
                onChange={(e) => setMensagemHome(e.target.value)}
                className="w-full text-[#753812] focus:outline-none bg-transparent"
                placeholder="Ex: Encomendas abertas para a Páscoa!"
              />
            </section>
          </section>

          {/* Upload e Pré-visualização */}
          <section className="w-[90%] flex flex-col gap-3">
            <label className="text-left w-full text-[1rem] text-[#753812] font-bold">
              Nova Imagem <span className="text-xs font-normal text-[#78401F]">(Opcional se alterar apenas a mensagem)</span>
            </label>
            
            <label htmlFor="imagem-home" className="flex flex-col items-center justify-center gap-1 border border-dashed border-[#E8CDB5] rounded-xl p-4 cursor-pointer hover:bg-orange-50/50 transition-colors bg-white">
              <i className="flex fi fi-rr-cloud-upload text-3xl text-[#78401F]"></i>
              <p className="text-xs text-[#78401F] text-center font-semibold">Clique para selecionar uma imagem<br/>ou arraste e solte aqui</p>
              <p className="text-[10px] font-semibold text-gray-500 text-center mt-1">Formatos aceitos: JPG, PNG, WEBP (Máx. 10MB)</p>
              <input 
                type="file" 
                id="imagem-home" 
                accept="image/png, image/jpeg, image/webp" 
                onChange={handleImageChange}
                className="hidden"
              />
            </label>
            
            <article className="flex flex-col gap-2 mt-1">
              <p className="text-sm font-semibold text-[#78401F]">Pré-visualização</p>
              <picture className="flex justify-center w-full">
                <img 
                  src={previewUrl} 
                  alt="Pré-visualização da foto da Home" 
                  className="w-full md:w-1/2 h-36 md:h-44 object-cover rounded-xl border border-[#e5ccb6] shadow-sm"
                />
              </picture>
            </article>
          </section>

          {/* Botões de Ação */}
          <section className="flex w-[90%] justify-between gap-4 mt-2">
            <button 
              type="button" 
              onClick={() => setPaginaAtiva && setPaginaAtiva('home')}
              className="bg-[#fdf3e6] border-2 border-[#753812] text-[#753812] font-bold text-[1rem] rounded-3xl px-4 py-1.5 hover:opacity-65 cursor-pointer flex justify-center gap-2 items-center"
            >
              <i className="fi fi-sr-arrow-left flex text-[1rem]"></i>Voltar
            </button>
            <button 
              type="submit" 
              disabled={carregando}
              className="bg-[#c26918] text-white font-bold text-[1rem] rounded-3xl py-1.5 w-full hover:opacity-65 cursor-pointer flex justify-center gap-2 px-2 items-center disabled:opacity-50"
            >
              <i className="fi fi-sr-disk flex text-[1rem]"></i>
              {carregando ? 'Salvando...' : 'Salvar Alterações'}
            </button>
          </section>
        </form>
      </section>
    </section>
  );
};

export default TelaAlterarFotoHome;