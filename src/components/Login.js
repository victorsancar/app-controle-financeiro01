import React, { useState } from 'react';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';

/**
 * Componente que renderiza a tela de Login e Cadastro e gerencia as funções de
 * autenticação de utilizadores.
 */
export default function Login() {
  const [isLoginView, setIsLoginView] = useState(true); // Controla se o formulário é de Login ou Cadastro
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const auth = getAuth();

  const handleAuth = async (e) => {
    e.preventDefault();
    setError('');
    try {
      if (isLoginView) {
        // Tenta fazer login com o e-mail e senha fornecidos
        await signInWithEmailAndPassword(auth, email, password);
      } else {
        // Tenta criar uma nova conta com o e-mail e senha fornecidos
        await createUserWithEmailAndPassword(auth, email, password);
      }
    } catch (err) {
      // Em caso de erro (senha errada, e-mail já existe, etc.), mostra a mensagem
      setError('Falha na autenticação. Verifique o seu e-mail e senha.');
      console.error(err);
    }
  };

  return (
    <div className="card" style={{ maxWidth: '400px', margin: '40px auto' }}>
      <h2 className="card-title">{isLoginView ? 'Login' : 'Cadastre-se'}</h2>
      <form onSubmit={handleAuth} className="form-container">
        <input
          className="form-input full-width"
          type="email"
          placeholder="Seu e-mail"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          className="form-input full-width"
          type="password"
          placeholder="Sua senha (mínimo 6 caracteres)"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit" className="form-button full-width">
          {isLoginView ? 'Entrar' : 'Criar Conta'}
        </button>
        {error && <p style={{ color: 'var(--primary-red)', textAlign: 'center', marginTop: '10px' }}>{error}</p>}
      </form>
      <button 
        onClick={() => setIsLoginView(!isLoginView)} 
        style={{ background: 'none', border: 'none', color: 'var(--primary-blue)', cursor: 'pointer', display: 'block', margin: '15px auto' }}>
        {isLoginView ? 'Não tem uma conta? Cadastre-se' : 'Já tem uma conta? Faça login'}
      </button>
    </div>
  );
}
