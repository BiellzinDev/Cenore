# 🍰 Cenore — Sistema E-commerce & Painel Administrativo

<div align="center">

  <p><b>Sistema web completo para gestão de confeitaria artesanal com Catálogo Dinâmico, CMS Administrativo integrado ao Google Sheets, Cloudinary CDN e Autenticação Firebase.</b></p>

  <p>
    <a href="#-sobre-o-projeto">Sobre</a> •
    <a href="#-funcionalidades-principais">Funcionalidades</a> •
    <a href="#-tecnologias-utilizadas">Tecnologias</a> •
    <a href="#-arquitetura--fluxo-de-dados">Arquitetura</a> •
    <a href="#-contato">Contato</a>
  </p>
</div>

---

## 🚀 Sobre o Projeto

O **Cenore** foi desenvolvido para solucionar uma necessidade real de negócio: unir a vitrine de produtos artesanais de uma confeitaria (Bolos, Doces Gourmet e Bombons) a um **Painel Administrativo seguro e dinâmico**. 

O grande diferencial deste projeto é a escolha arquitetural de baixo custo e alta eficiência: utilizando o **Google Sheets** como banco de dados NoSQL/Relacional por meio de uma API em **Google Apps Script**, combinada com o **Cloudinary** para gerenciamento e otimização de imagens na nuvem.

---

## ✨ Funcionalidades Principais

### 🛍️ Vitrine de Clientes (Frontend Público)
* **Catálogo Dinâmico por Categorias**: Listagem interativa de Bolos, Doces Gourmet e Bombons com layout responsivo em zigue-zague.
* **Dados Híbridos**: Sistema inteligente que mescla produtos fixos padrão com novos itens cadastrados via painel em tempo real.
* **Editor de Texto Rico (Tiptap)**: Suporte a descrições formatadas (negrito, listas, parágrafos) renderizadas com segurança.
* **Navegação Fluida**: Roteamento dinâmico entre seções e página de orçamentos.

### 🔐 Painel Administrativo (CMS)
* **Autenticação Firebase**: Sistema de login seguro restrito a administradores autenticados.
* **Controle de Acesso Baseado em Funções (RBAC)**: Botões de gerenciamento e exclusão visíveis exclusivamente para administradores logados.
* **Cadastro de Produtos (`TelaCadastroDoces`)**: Interface intuitiva para upload de imagens e inserção de descrições ricas.
* **Deleção Segura em Cascata**: Ao excluir um produto pelo site, o sistema aciona o backend para **remover a linha correspondente no Google Sheets** e **destruir o asset de imagem na nuvem via Cloudinary Admin API**.

---

## 🛠️ Tecnologias Utilizadas

Este projeto foi construído utilizando tecnologias modernas do ecossistema frontend e computação em nuvem serverless:

* **Frontend**: `React.js`, `Vite`, `JavaScript (ES6+)`
* **Estilização**: `Tailwind CSS` (para design responsivo e customizado)
* **Editor de Texto**: `Tiptap` (Rich Text Editor)
* **Autenticação & Segurança**: `Firebase Auth`
* **Gerenciamento de Mídia**: `Cloudinary CDN` (Upload e signed API de deleção)
* **Banco de Dados & Backend Serverless**: `Google Sheets` + `Google Apps Script` (Web Apps REST API)

---

## 📂 Arquitetura & Fluxo de Dados

```text
[ React Frontend ] 
       │
       ├── (GET / POST) ──> [ Google Apps Script Web App ] 
       │                           │               │
       │                           ▼               ▼
       │                    [ Google Sheets ]  [ Cloudinary API ]
       │                    (Persistência)     (CDN / Deleção)
       │
       └── [ Firebase Auth ] (Gestão de Sessão do Admin)