import React from 'react';

/**
 * WelcomeScreen é o componente da tela inicial.
 * Ele exibe uma mensagem de boas-vindas e um botão para iniciar o uso do app.
 * @param {object} props - Propriedades do componente.
 * @param {function} props.onStart - Função a ser chamada quando o botão é clicado.
 */
export default function WelcomeScreen({ onStart }) {
  // Estilos inline para simplicidade, poderiam estar em um arquivo CSS.
  const styles = {
    welcomeContainer: {
      textAlign: 'center',
      padding: '40px 20px',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      height: 'calc(100vh - 200px)', // Ajusta a altura
    },
    welcomeImage: {
      maxWidth: '300px',
      marginBottom: '2rem',
      borderRadius: '12px',
      boxShadow: '0 8px 24px rgba(0,0,0,0.15)',
    },
    welcomeTitle: {
      fontSize: '2.5rem',
      color: '#0056b3',
      marginBottom: '1rem',
    },
    welcomeText: {
      fontSize: '1.2rem',
      color: '#343a40',
      maxWidth: '600px',
      marginBottom: '2rem',
    },
    startButton: {
      padding: '15px 30px',
      fontSize: '1.1rem',
      backgroundColor: '#0056b3',
      color: 'white',
      border: 'none',
      borderRadius: '50px',
      cursor: 'pointer',
      transition: 'transform 0.2s, box-shadow 0.2s',
    }
  };

  return (
    <div style={styles.welcomeContainer}>
      <img 
        src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTaUQQGAJM7byzua95qQVjhGaLD75y-SxsYbg&s"
        alt="Pessoa planejando finanças" 
        style={styles.welcomeImage}
      />
      <h1 style={styles.welcomeTitle}>Bem-vindo ao seu Painel Financeiro</h1>
      <p style={styles.welcomeText}>
        Assuma o controle total do seu dinheiro. Acompanhe suas despesas diárias, 
        planeje seu orçamento mensal e alcance suas metas financeiras com facilidade.
      </p>
      <button 
        style={styles.startButton} 
        onClick={onStart}
        onMouseOver={e => e.currentTarget.style.transform = 'scale(1.05)'}
        onMouseOut={e => e.currentTarget.style.transform = 'scale(1)'}
      >
        Começar a Planejar
      </button>
    </div>
  );
}

