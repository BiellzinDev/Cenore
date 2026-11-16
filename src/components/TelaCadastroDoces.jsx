import React, { useState } from 'react';
import RichTextEditor from "./RichTextEditor";
import imagens from '../imagens.json';

const TelaCadastroDoces = () => {
  // 1. Estados para armazenar os dados do formulário e os modais
  const [nome, setNome] = useState('');
  const [categoria, setCategoria] = useState('gourmets');
  const [descricao, setDescricao] = useState('');
  const [descricaoCurta, setDescricaoCurta] = useState('');
  const [imagemFile, setImagemFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(imagens.login.brigadeiroMadeira);
  const [carregando, setCarregando] = useState(false);
  const [mensagemSucesso, setMensagemSucesso] = useState('');
  const [mensagemErro, setMensagemErro] = useState(''); // <--- Estado para o modal de erro/limite

  // Credenciais do Cloudinary e Google Sheets
  const CLOUD_NAME = 'eas3rbfj';
  const UPLOAD_PRESET = 'rwmskpok';
  const GOOGLE_SHEETS_URL = 'https://script.google.com/macros/s/AKfycbxodGzHhpYjN3rs-uW8nCaijFBsWtrtV9wFGg-tJ-g-4ej3gBEkfZEIMfEx6kDa2vr-gw/exec';

  const TAMANHO_MAXIMO_BYTES = 10 * 1024 * 1024; // 10MB em bytes

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Verifica se ultrapassa 10MB
      if (file.size > TAMANHO_MAXIMO_BYTES) {
        setMensagemErro('Tamanho limite de imagem ultrapassado');
        e.target.value = ''; // Limpa o input para permitir selecionar outro arquivo
        return;
      }

      setImagemFile(file);
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMensagemSucesso('');

    if (!imagemFile) {
      setMensagemErro('Por favor, selecione uma imagem para o doce.');
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

      // 2. PASSO: Enviar os dados do produto para o Google Sheets
      const produtoData = {
        nome,
        categoria,
        descricao,
        descricaoCurta,
        imagem: imageUrl,
      };

      await fetch(GOOGLE_SHEETS_URL, {
        method: 'POST',
        mode: 'no-cors',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(produtoData),
      });

      // Exibe o modal de sucesso no centro da tela
      setMensagemSucesso('Cadastrado com sucesso!');

      // Limpar formulário após o sucesso
      setNome('');
      setCategoria('gourmets');
      setDescricao('');
      setDescricaoCurta('');
      setImagemFile(null);
      setPreviewUrl(imagens.login.brigadeiroMadeira);

      // Fecha o modal automaticamente após 3 segundos
      setTimeout(() => {
        setMensagemSucesso('');
      }, 3000);

    } catch (error) {
      console.error('Erro ao cadastrar doce:', error);
      setMensagemErro('Ocorreu um erro ao salvar o doce. Tente novamente.');
    } finally {
      setCarregando(false);
    }
  };

  return (
    <section className="w-full relative h-screen flex justify-center items-start overflow-hidden md:h-[calc(100vh-7rem)] ">
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
            <button
              type="button"
              onClick={() => setMensagemSucesso('')}
              className="text-center bg-[#c26918] text-white py-2 px-6 rounded-2xl cursor-pointer hover:opacity-80 font-bold w-full"
            >
              OK
            </button>
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
            <p className="text-[#753812] text-xs text-center font-medium">
              O tamanho máximo permitido é de 10MB.
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
        <img src={imagens.login.fundo} className="w-full h-full object-cover" alt="Imagem de fundo da tela de login com brigadeiro" />
      </picture>

      <section className="bg-[#fdf3e6] w-[85%] max-h-140 overflow-y-scroll pb-8 mt-12 py-4 rounded-4xl px-2 z-20 shadow-xl max-w-2xl">
        <form onSubmit={handleSubmit} className="flex flex-col items-center justify-center gap-3">
          <section className="flex w-[90%] items-center justify-start gap-2">
            <picture className="flex items-center justify-center text-[#753812] text-5xl">
              <i className="fi fi-ss-add flex"></i>
            </picture>
            <article className="flex flex-col items-center justify-start">
              <h2 className="font-bold w-full text-left text-[1.2rem] text-[#753812]">Cadastrar Novo Doce</h2>
              <p className="text-left text-[.75rem] text-[#753812] font-medium">Preencha as informações abaixo para adicionar um novo doce ao cardápio.</p>
            </article>
          </section>

          <section className="w-[90%] flex flex-col gap-4">
            {/* Nome do Doce */}
            <section className="w-full">
              <label htmlFor="candy" className="text-left w-full text-[1rem] text-[#753812] font-bold">
                Nome do Doce <picture><i className="fi fi-sr-star text-[.5rem] align-text-top text-[#FE1717]"></i></picture>
              </label>
              <section className="flex gap-1 border border-[#e5ccb6] rounded-[10px] p-2 items-center justify-start bg-white">
                <input
                  type="text"
                  name="candy"
                  value={nome}
                  onChange={(e) => setNome(e.target.value)}
                  className="w-[90%] focus:outline-none bg-transparent"
                  placeholder="Ex: Brigadeiro Gourmet"
                  required
                />
              </section>
            </section>

            {/* Categoria */}
            <section className="w-full">
              <label htmlFor="categoria" className="text-left w-full text-[1rem] text-[#753812] font-bold">
                Categoria <picture><i className="fi fi-sr-star text-[.5rem] align-text-top text-[#FE1717]"></i></picture>
              </label>
              <section className="flex gap-1 border border-[#e5ccb6] rounded-[10px] p-2 items-center justify-start bg-white">
                <select
                  value={categoria}
                  onChange={(e) => setCategoria(e.target.value)}
                  className="w-full text-[#753812] focus:outline-none bg-transparent"
                >
                  <option value="gourmets">Gourmets</option>
                  <option value="bolos">Bolos</option>
                  <option value="bombons">Bombons</option>
                </select>
              </section>
            </section>

            {/* Descrição */}
            <section className="w-full">
              <label htmlFor="descricao" className="text-left w-full text-[1rem] text-[#753812] font-bold">
                Descrição<span><i className="fi fi-sr-star text-[.5rem] align-text-top text-[#FE1717]"></i></span>
              </label>
              <RichTextEditor
                value={descricao}
                onChange={(novoTexto) => setDescricao(novoTexto)}
              />
            </section>

            {/* Imagem do Doce */}
            <section className="w-full flex flex-col gap-2">
              <label className="text-left w-full text-[1rem] text-[#753812] font-bold">
                Imagem do Doce <span><i className="fi fi-sr-star text-[.5rem] align-text-top text-[#FE1717]"></i></span>
              </label>
              <label htmlFor="imagem-doce" className="flex flex-col items-center justify-center gap-1 border border-dashed border-[#E8CDB5] rounded-xl p-3 cursor-pointer hover:bg-orange-50/50 transition-colors bg-white">
                <i className="flex fi fi-rr-picture text-2xl text-[#78401F]"></i>
                <p className="text-xs text-[#78401F] text-center font-semibold">Clique para selecionar uma imagem<br />ou arraste e solte aqui</p>
                <p className="text-[10px] font-semibold text-gray-500 text-center mt-1">Formatos aceitos: JPG, PNG, WEBP (Máx. 10MB)<br />Tamanho recomendado: 800x600px</p>
                <input
                  type="file"
                  id="imagem-doce"
                  accept="image/png, image/jpeg, image/webp"
                  onChange={handleImageChange}
                  className="hidden"
                />
              </label>

              <article className="flex flex-col gap-2">
                <p className="text-sm font-semibold text-[#78401F]">Pré-visualização da imagem</p>
                <picture className="flex justify-center">
                  <img src={previewUrl} alt="Pré-visualização do doce" className="w-1/2 h-24 md:h-36 object-cover rounded-lg border border-[#e5ccb6] shadow-sm" />
                </picture>
              </article>
            </section>
          </section>

          {/* Botões de Ação */}
          <section className="flex w-[90%] justify-between gap-4 mt-2">
            <button
              type="button"
              className="bg-[#fdf3e6] border-2 border-[#753812] text-[#753812] font-bold text-[1rem] rounded-3xl px-4 py-1 hover:opacity-65 cursor-pointer flex justify-center gap-2 items-center"
            >
              <i className="fi fi-sr-arrow-left flex text-[1rem]"></i>Cancelar
            </button>
            <button
              type="submit"
              disabled={carregando}
              className="bg-[#c26918] text-white font-bold text-[1rem] rounded-3xl py-1 w-full hover:opacity-65 cursor-pointer flex justify-center gap-2 px-1 items-center disabled:opacity-50"
            >
              <i className="fi fi-sr-disk flex text-[1rem]"></i>
              {carregando ? 'Salvando...' : 'Adicionar'}
            </button>
          </section>
        </form>
      </section>
    </section>
  );
};

export default TelaCadastroDoces;