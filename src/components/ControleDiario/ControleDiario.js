import React, { useState, useEffect } from 'react';
// Importa a instância do banco de dados e as funções do Firestore
import { db } from '../firebase';
import { collection, addDoc, onSnapshot, doc, deleteDoc } from 'firebase/firestore';

export default function ControleDiario() {
  const [itens, setItens] = useState([]);
  const [descricao, setDescricao] = useState('');
  const [valor, setValor] = useState('');
  const [tipo, setTipo] = useState('despesa');

  // useEffect será executado quando o componente carregar
  useEffect(() => {
    // Cria uma "escuta" em tempo real na coleção 'controle-diario'
    const unsubscribe = onSnapshot(collection(db, 'controle-diario'), (snapshot) => {
      const listaDeItens = snapshot.docs.map(doc => ({
        id: doc.id, // O ID do documento no Firestore
        ...doc.data() // Os dados do documento (descricao, valor, tipo)
      }));
      setItens(listaDeItens);
    });

    // Função de limpeza para remover a "escuta" quando o componente for desmontado
    return () => unsubscribe();
  }, []); // O array vazio [] garante que isso rode apenas uma vez

  const adicionarItem = async (e) => {
    e.preventDefault();
    if (!descricao || !valor) return;

    try {
      // Adiciona um novo documento na coleção 'controle-diario'
      await addDoc(collection(db, 'controle-diario'), {
        descricao,
        valor: parseFloat(valor),
        tipo,
        data: new Date() // Salva a data de criação
      });
      // Limpa os campos do formulário
      setDescricao('');
      setValor('');
    } catch (error) {
      console.error("Erro ao adicionar item: ", error);
    }
  };

  const excluirItem = async (id) => {
    try {
      // Deleta o documento com o ID especificado
      await deleteDoc(doc(db, 'controle-diario', id));
    } catch (error) {
      console.error("Erro ao excluir item: ", error);
    }
  };

  const totalEntradas = itens.filter(i => i.tipo === 'renda').reduce((acc, i) => acc + i.valor, 0);
  const totalSaidas = itens.filter(i => i.tipo === 'despesa').reduce((acc, i) => acc + i.valor, 0);
  const saldoMes = totalEntradas - totalSaidas;

  return (
    <div className="card">
      <h2 className="card-title">Controle Diário</h2>
      
      <form onSubmit={adicionarItem} className="form-container">
        <div className="form-grid">
          <input
            className="form-input full-width"
            type="text"
            placeholder="Descrição (ex: Café da manhã)"
            value={descricao}
            onChange={(e) => setDescricao(e.target.value)}
          />
          <input
            className="form-input"
            type="number"
            step="0.01"
            placeholder="Valor"
            value={valor}
            onChange={(e) => setValor(e.target.value)}
          />
          <select className="form-select" value={tipo} onChange={(e) => setTipo(e.target.value)}>
            <option value="despesa">Despesa</option>
            <option value="renda">Renda</option>
          </select>
        </div>
        <button className="form-button full-width" type="submit" style={{ marginTop: '15px' }}>Adicionar</button>
      </form>

      <fieldset className="fieldset">
        <legend className="legend">Lançamentos do Mês</legend>
        <ul className="item-list">
          {itens.map(item => (
            <li key={item.id} className="list-item" style={{ color: item.tipo === 'despesa' ? 'var(--primary-red)' : 'var(--primary-green)'}}>
              <span>{item.descricao}</span>
              <div>
                <span className="item-valor">R$ {item.valor.toFixed(2)}</span>
                <button className="delete-button" onClick={() => excluirItem(item.id)}>X</button>
              </div>
            </li>
          ))}
        </ul>
      </fieldset>

      <div className="resultado-container">
        <p className="resultado-texto">Total de Entradas: <span style={{ color: 'var(--primary-green)' }}>R$ {totalEntradas.toFixed(2)}</span></p>
        <p className="resultado-texto">Total de Saídas: <span style={{ color: 'var(--primary-red)' }}>R$ {totalSaidas.toFixed(2)}</span></p>
        <h3 className="saldo-final">Saldo do Mês: R$ {saldoMes.toFixed(2)}</h3>
      </div>
    </div>
  );
}