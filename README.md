# 🛠️ Sistema de Cadastro e Vendas
Este projeto é um sistema simples de cadastro de produtos e registro de vendas utilizando **Node.js**, **SQLite** e **JavaScript** .

## 📌 Funcionalidades
✅ Cadastro de produtos com nome e preço.  
✅ Listagem de produtos disponíveis.  
✅ Registro de vendas com ID do produto e quantidade.  
✅ Listagem das vendas realizadas.  
✅ Exclusão de produtos e vendas.  
✅ Interface visual aprimorada com **CSS moderno**.  

## 📂 Estrutura do Projeto
Sistema_Web
├── backend/
│   ├── database.db        # Banco de dados SQLite
│   └── server.js          # Servidor Node.js com rotas
├── frontend/
│   ├── app.js             # Lógica do frontend (JS)
│   ├── index.html         # Página principal
│   └── styles.css         # Estilo visual
├── package.json           # Dependências do projeto
├── README.md              # Documentação
└── testes.http            # Requisições de teste


## 🚀 Como Rodar o Projeto

   git clone https://github.com/MayaraMrachna/Sistema_Web.git
   
- Instale as dependências do projeto:

   npm install 

   - Inicie o servidor:

node backend/server.js

- Abra o arquivo frontend/index.html no navegador para acessar o sistema

🧠 Extras úteis
- O banco de dados está salvo no arquivo backend/database.db e é criado automaticamente ao rodar o servidor.
- Você pode consultar os dados diretamente pelo terminal com:

sqlite3 backend/database.db

- e comandos como:
SELECT * FROM produtos;
SELECT * FROM vendas;
