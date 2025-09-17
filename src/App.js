import React, { useState, useEffect } from 'react';
import { getAuth, onAuthStateChanged } from 'firebase/auth';

// Importando os componentes com os caminhos corretos para as subpastas
import GlobalStyles from './styles/GlobalStyles';
import WelcomeScreen from './components/WelcomeScreen/WelcomeScreen';
import PlanejamentoFinanceiro from './components/PlanejamentoMensal/PlanejamentoMensal';
import CalculadoraJuros from './components/CalculadoraJuros/CalculadoraJuros';
import DicasFinanceiras from './components/DicasFinanceiras/DicasFinanceiras';
import Login from './components/Login'; // Corrigido para corresponder à estrutura de pastas

function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [paginaAtual, setPaginaAtual] = useState('home');
  const auth = getAuth();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });
    return () => unsubscribe();
  }, [auth]);

  if (loading) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <h2>A carregar...</h2>
      </div>
    );
  }

  if (user) {
    return (
        <div className="app-container">
            <GlobalStyles />
            <header className="app-header">
                <h1>Painel Financeiro</h1>
                <p>Por favor, faça login ou registe-se para continuar.</p>
            </header>
            <main>
                <Login />
            </main>
        </div>
    );
  }
  
  const renderizarPagina = () => {
    switch (paginaAtual) {
      case 'home': return <WelcomeScreen onStart={() => setPaginaAtual('planejamento')} />;
      case 'planejamento': return <PlanejamentoFinanceiro userId={user.uid} />;
      case 'juros': return <CalculadoraJuros />;
      case 'dicas': return <DicasFinanceiras />;
      default: return <WelcomeScreen onStart={() => setPaginaAtual('planejamento')} />;
    }
  };

  return (
    <div className="app-container">
      <GlobalStyles />
      <header className="app-header">
        <h1>Meu Painel Financeiro</h1>
        <nav className="app-nav">
          <button className={`nav-button ${paginaAtual === 'home' ? 'active' : ''}`} onClick={() => setPaginaAtual('home')}>Início</button>
          <button className={`nav-button ${paginaAtual === 'planejamento' ? 'active' : ''}`} onClick={() => setPaginaAtual('planejamento')}>Planeamento</button>
          <button className={`nav-button ${paginaAtual === 'juros' ? 'active' : ''}`} onClick={() => setPaginaAtual('juros')}>Calculadora</button>
          <button className={`nav-button ${paginaAtual === 'dicas' ? 'active' : ''}`} onClick={() => setPaginaAtual('dicas')}>Dicas</button>
           <button className="nav-button" onClick={() => auth.signOut()}>Sair</button>
        </nav>
      </header>
      <main>
        {renderizarPagina()}
      </main>
    </div>
  );
}

export default App;

