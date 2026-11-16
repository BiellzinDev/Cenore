import React, { useState } from 'react';
import imagens from '../imagens.json';

// Recebemos a função 'onFotoAtualizada' via props
const TelaAlterarFotoHome = ({ setPaginaAtiva, onFotoAtualizada }) => {
  const [imagemFile, setImagemFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(imagens.home.hero);
  const [carregando, setCarregando] = useState(false);
  const [mensagemSucesso, setMensagemSucesso] = useState('');

  // Credenciais do Cloudinary e Google Sheets
  const CLOUD_NAME = 'eas3rbfj';
  const UPLOAD_PRESET = 'rwmskpok';
  const GOOGLE_SHEETS_URL = 'https://script.google.com/macros/s/AKfycbxodGzHhpYjN3rs-uW8nCaijFBsWtrtV9wFGg-tJ-g-4ej3gBEkfZEIMfEx6kDa2vr-gw/exec';

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImagemFile(file);
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMensagemSucesso('');

    if (!imagemFile) {
      alert('Por favor, selecione uma nova imagem para a tela inicial.');
      return;
    }

    setCarregando(true);

    try {
      // 1. PASSO: Upload da imagem para o Cloudinary via API
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
      const imageUrl = cloudinaryData.secure_url;

      if (!imageUrl) {
        throw new Error('Falha ao enviar a imagem para o Cloudinary.');
      }

      // 2. PASSO: Enviar a nova URL da foto da Home para o Google Sheets
      const bannerData = {
        tipo: 'foto_home',
        imagem: imageUrl,
      };

      await fetch(GOOGLE_SHEETS_URL, {
        method: 'POST',
        mode: 'no-cors',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(bannerData),
      });

      // 3. ATUALIZAÇÃO IMEDIATA NO APP: Avisa o App.jsx para trocar a foto na hora
      if (onFotoAtualizada) {
        onFotoAtualizada(imageUrl);
      }

      setMensagemSucesso('Foto da Home atualizada com sucesso!');
      setImagemFile(null);

      // Opcional: Volta para a home automaticamente após 2 segundos de sucesso
      setTimeout(() => {
        setMensagemSucesso('');
        if (setPaginaAtiva) setPaginaAtiva('home');
      }, 2000);

    } catch (error) {
      console.error('Erro ao atualizar foto da home:', error);
      alert('Ocorreu um erro ao salvar a imagem. Tente novamente.');
    } finally {
      setCarregando(false);
    }
  };

  return (
    <section className="w-full relative h-screen flex justify-center items-start overflow-hidden md:h-[calc(100vh-7rem)]">
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
              <h2 className="font-bold w-full text-left text-[1.2rem] text-[#753812]">Alterar Foto da Home</h2>
              <p className="text-left text-[.75rem] text-[#753812] font-medium">Selecione a nova imagem principal que aparecerá na página inicial.</p>
            </article>
          </section>

          {/* Upload e Pré-visualização */}
          <section className="w-[90%] flex flex-col gap-3">
            <label className="text-left w-full text-[1rem] text-[#753812] font-bold">
              Nova Imagem <picture><i className="fi fi-sr-star text-[.5rem] align-text-top text-[#FE1717]"></i></picture>
            </label>
            
            <label htmlFor="imagem-home" className="flex flex-col items-center justify-center gap-1 border border-dashed border-[#E8CDB5] rounded-xl p-4 cursor-pointer hover:bg-orange-50/50 transition-colors bg-white">
              <i className="flex fi fi-rr-cloud-upload text-3xl text-[#78401F]"></i>
              <p className="text-xs text-[#78401F] text-center font-semibold">Clique para selecionar uma imagem<br/>ou arraste e solte aqui</p>
              <p className="text-[10px] font-semibold text-gray-500 text-center mt-1">Formatos aceitos: JPG, PNG, WEBP</p>
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
              {carregando ? 'Salvando...' : 'Atualizar Foto'}
            </button>
          </section>

          {/* Exibição da mensagem de sucesso na tela */}
          {mensagemSucesso && (
            <section className="w-[90%] bg-green-100 border border-green-400 text-green-700 px-4 py-2 rounded-xl text-sm font-bold text-center flex items-center justify-center gap-2">
              <i className="fi fi-sr-check text-green-600"></i> {mensagemSucesso}
            </section>
          )}
        </form>
      </section>
    </section>
  );
};

export default TelaAlterarFotoHome;