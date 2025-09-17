import React, { useState, useEffect } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './firebase';

const LoggedOutView = () => (<div>Login</div>);
const LoggedInView = ({ user }) => (<div>Bem-vindo, {user.email}</div>);

function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      console.log('Auth state changed:', currentUser);
      setUser(currentUser);
      setLoading(false);
    });
    return () => unsubscribe();
  }, [auth]);

  if (loading) {
    return <p>A carregar...</p>;
  }

  return user ? <LoggedInView user={user} /> : <LoggedOutView />;
}

export default App;
