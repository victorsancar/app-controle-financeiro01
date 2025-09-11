import { useEffect, useState } from 'react';
import { getAuth, onAuthStateChanged } from 'firebase/auth';

/**
 * Hook personalizado para gerenciar o estado de autenticação do usuário.
 * Ele "escuta" as mudanças de login/logout do Firebase e retorna o usuário atual.
 */
function useAuth() {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, user => {
      setCurrentUser(user);
      setLoading(false);
    });

    // Limpa o "ouvinte" quando o componente é desmontado
    return unsubscribe;
  }, []);

  return { currentUser, loading };
}

export default useAuth;
