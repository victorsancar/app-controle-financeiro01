// Importa as funções necessárias do SDK do Firebase
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth"; // <-- Importe o getAuth



// TODO: Adicione a configuração do seu projeto Firebase aqui
const firebaseConfig = {
  apiKey: "AIzaSyCBpcGYOH_FbwBCvgn_mnfnsQIU7hN1HOg",
  authDomain: "app-controle-financeiro-db26d.firebaseapp.com",
  projectId: "app-controle-financeiro-db26d",
  storageBucket: "app-controle-financeiro-db26d.firebasestorage.app",
  messagingSenderId: "962824406010",
  appId: "1:962824406010:web:60b73400262049badb5a43"
};

// Inicializa o Firebase
const app = initializeApp(firebaseConfig);

// Exporta a instância do banco de dados Firestore para ser usada em outros componentes
export const db = getFirestore(app);
export const auth = getAuth(app); // <-- Exporte a instância do Auth