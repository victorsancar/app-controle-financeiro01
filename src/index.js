import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App'; // Importa o componente principal
import './components/firebase'; // Importa e executa o arquivo de inicialização do Firebase

// Cria a raiz da aplicação no elemento com id 'root' do HTML
const root = ReactDOM.createRoot(document.getElementById('root'));

// Renderiza o componente App dentro da raiz
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

