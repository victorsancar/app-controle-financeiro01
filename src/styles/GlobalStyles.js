/**
 * Este componente não renderiza HTML, mas sim injeta estilos CSS globais
 * na aplicação. Usamos a biblioteca 'styled-components' para isso, mas aqui
 * vamos exportar o CSS como um componente de estilo para manter a consistência.
 */
const GlobalStyles = () => {
  const css = `
    /* CSS Variables para cores - facilita a manutenção do tema */
    :root {
      --primary-blue: #007bff;
      --primary-dark-blue: #0056b3;
      --primary-green: #28a745;
      --primary-red: #dc3545;
      --light-gray: #f8f9fa;
      --medium-gray: #dee2e6;
      --dark-gray: #343a40;
      --text-color: #212529;
      --white: #fff;
    }

    /* Reset e Estilos Globais */
    *, *::before, *::after {
      box-sizing: border-box;
      margin: 0;
      padding: 0;
    }

    body {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
      background-color: var(--light-gray);
      color: var(--text-color);
      line-height: 1.6;
    }

    .app-container {
      display: flex;
      flex-direction: column;
      min-height: 100vh;
    }

    .app-header {
      background-color: var(--white);
      padding: 1rem 2rem;
      box-shadow: 0 2px 4px rgba(0,0,0,0.1);
      display: flex;
      justify-content: space-between;
      align-items: center;
      flex-wrap: wrap; /* Permite que o menu quebre em telas pequenas */
    }

    .app-header h1 {
      color: var(--primary-blue);
      font-size: 1.5rem;
    }

    .app-nav {
      display: flex;
      gap: 0.5rem;
      flex-wrap: wrap;
    }

    .nav-button {
      background: none;
      border: 1px solid var(--medium-gray);
      padding: 0.5rem 1rem;
      border-radius: 50px; /* Botões arredondados */
      cursor: pointer;
      transition: all 0.2s ease-in-out;
      font-weight: 500;
    }

    .nav-button:hover {
      background-color: var(--light-gray);
      border-color: var(--primary-blue);
    }

    .nav-button.active {
      background-color: var(--primary-blue);
      color: var(--white);
      border-color: var(--primary-blue);
    }
    
    main {
      flex-grow: 1;
      padding: 2rem;
      max-width: 1200px;
      margin: 0 auto;
      width: 100%;
    }

    /* Estilos de Componentes Comuns */
    .card {
      background-color: var(--white);
      padding: 1.5rem;
      border-radius: 12px;
      box-shadow: 0 4px 12px rgba(0,0,0,0.1);
      animation: fadeIn 0.5s ease-in-out;
    }

    .card-title {
      color: var(--primary-dark-blue);
      margin-bottom: 1.5rem;
      text-align: center;
    }

    .form-container, .fieldset, .resultado-container {
      margin-top: 1.5rem;
    }

    .form-grid {
      display: grid;
      gap: 1rem;
      grid-template-columns: 1fr 1fr 1fr;
    }
    
    .form-input, .form-select, .form-button {
      width: 100%;
      padding: 0.75rem;
      border: 1px solid var(--medium-gray);
      border-radius: 8px;
      font-size: 1rem;
    }

    .form-button {
      background-color: var(--primary-blue);
      color: var(--white);
      border: none;
      cursor: pointer;
      transition: background-color 0.2s;
    }

    .form-button:hover {
      background-color: var(--primary-dark-blue);
    }
    
    .full-width {
      grid-column: 1 / -1; /* Ocupa a largura toda */
    }

    .item-list {
      list-style: none;
      max-height: 300px;
      overflow-y: auto;
      padding-right: 10px;
    }

    .list-item {
      display: flex;
      justify-content: space-between;
      padding: 0.75rem 0;
      border-bottom: 1px solid var(--light-gray);
    }

    .delete-button {
      background: var(--primary-red);
      color: white;
      border: none;
      border-radius: 50%;
      width: 24px;
      height: 24px;
      cursor: pointer;
      margin-left: 1rem;
      font-weight: bold;
    }

    /* Responsividade */
    @media (max-width: 768px) {
      .app-header {
        flex-direction: column;
        gap: 1rem;
      }
      .form-grid {
        grid-template-columns: 1fr;
      }
      main {
        padding: 1rem;
      }
    }

    /* Animações */
    @keyframes fadeIn {
      from { opacity: 0; transform: translateY(10px); }
      to { opacity: 1; transform: translateY(0); }
    }
  `;
  return <style>{css}</style>;
};

export default GlobalStyles;

