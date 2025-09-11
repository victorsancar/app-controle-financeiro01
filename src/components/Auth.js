import React, { useState, useEffect } from 'react';
import { db } from './firebase';
import { collection, addDoc, onSnapshot, doc, deleteDoc, query, where } from 'firebase/firestore';

// O componente agora recebe o ID do usuário como uma propriedade (prop)
function PlanejamentoFinanceiro({ userId }) {
  const [orcamento, setOrcamento] = useState({
    rendas: [], despesasFixas: [], despesasVariaveis: [], poupanca: [], inesperados: [],
  });
  const [input, setInput] = useState({
    categoria: 'rendas', descricao: '', valor: '',
  });
  const [resultado, setResultado] = useState(null);
  const [loading, setLoading] = useState(true);

  // Carrega os dados do usuário do Firestore
  useEffect(() => {
    if (!userId) return; // Não faz nada se não houver um ID de usuário

    setLoading(true);
    // Cria uma consulta que busca apenas os documentos cujo campo 'userId' seja igual ao do usuário logado
    const q = query(collection(db, "lancamentos"), where("userId", "==", userId));

    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const newOrcamento = { rendas: [], despesasFixas: [], despesasVariaveis: [], poupanca: [], inesperados: [] };
      querySnapshot.forEach((doc) => {
        const data = doc.data();
        // Verifica se a categoria existe antes de adicionar
        if (newOrcamento[data.categoria]) {
          newOrcamento[data.categoria].push({ id: doc.id, ...data });
        }
      });
      setOrcamento(newOrcamento);
      setLoading(false);
    });

    // Limpa o "ouvinte" quando o componente for desmontado
    return () => unsubscribe();
  }, [userId]); // Executa novamente se o userId mudar (ex: logout e login com outra conta)

  const adicionarItem = async (e) => {
    e.preventDefault();
    if (!input.descricao || !input.valor) {
      alert("Por favor, preencha a descrição e o valor.");
      return;
    }
    // Adiciona o 'userId' ao novo item a ser salvo no banco de dados
    const novoItem = { 
        ...input, 
        valor: parseFloat(input.valor), 
        userId: userId // Garante que o lançamento pertence ao usuário logado
    };
    await addDoc(collection(db, "lancamentos"), novoItem);
    setInput({ ...input, descricao: '', valor: '' });
  };

  const removerItem = async (id) => {
    await deleteDoc(doc(db, "lancamentos", id));
  };
  
  const calcularBalanco = () => {
    const totalRendas = orcamento.rendas.reduce((acc, item) => acc + item.valor, 0);
    const totalDespesas = Object.keys(orcamento)
      .filter(key => key !== 'rendas')
      .flatMap(key => orcamento[key])
      .reduce((acc, item) => acc + item.valor, 0);
    const saldoFinal = totalRendas - totalDespesas;
    setResultado({ totalRendas, totalDespesas, saldoFinal });
  };

  // Componente interno para renderizar cada seção da planilha
  const SecaoOrcamento = ({ titulo, categoria, itens }) => (
    <fieldset className="fieldset">
      <legend className="legend">{titulo}</legend>
      <ul className="item-list">
        {itens.map(item => (
          <li key={item.id} className="list-item">
            <div>
              <span>{item.descricao}</span>
              <span className="item-valor">R$ {item.valor.toFixed(2)}</span>
            </div>
            <button onClick={() => removerItem(item.id)} className="delete-button">X</button>
          </li>
        ))}
        {itens.length === 0 && <p style={{textAlign: 'center', color: '#888'}}>Nenhum item adicionado.</p>}
      </ul>
    </fieldset>
  );

  if (loading) {
      return <div className="card"><p>Carregando seus dados...</p></div>
  }

  return (
    <div className="card">
      <h2 className="card-title">Planejamento Financeiro Detalhado</h2>
      <div className="form-container">
        <form onSubmit={adicionarItem}>
          <div className="form-grid">
            <select name="categoria" value={input.categoria} onChange={(e) => setInput({...input, categoria: e.target.value})} className="form-select full-width">
              <option value="rendas">Fonte de Renda</option>
              <option value="despesasFixas">Despesa Fixa</option>
              <option value="despesasVariaveis">Despesa Variável</option>
              <option value="poupanca">Poupança / Investimento</option>
              <option value="inesperados">Gasto Inesperado</option>
            </select>
            <input type="text" name="descricao" placeholder="Descrição (ex: Salário)" value={input.descricao} onChange={(e) => setInput({...input, descricao: e.target.value})} className="form-input" />
            <input type="number" name="valor" placeholder="Valor (R$)" value={input.valor} onChange={(e) => setInput({...input, valor: e.target.value})} className="form-input" />
            <button type="submit" className="form-button full-width">Adicionar Item</button>
          </div>
        </form>
      </div>
      <SecaoOrcamento titulo="Fontes de Renda" itens={orcamento.rendas} />
      <SecaoOrcamento titulo="Despesas Fixas" itens={orcamento.despesasFixas} />
      <SecaoOrcamento titulo="Despesas Variáveis" itens={orcamento.despesasVariaveis} />
      <SecaoOrcamento titulo="Poupança e Investimentos" itens={orcamento.poupanca} />
      <SecaoOrcamento titulo="Gastos Inesperados" itens={orcamento.inesperados} />
      <button onClick={calcularBalanco} className="calc-button">Calcular Balanço Mensal</button>
      {resultado && (
        <div className="resultado-container">
          <h3 style={{marginTop: 0}}>Resultado Final</h3>
          <p className="resultado-texto">Total de Rendas: <span style={{color: 'var(--primary-green)'}}>R$ {resultado.totalRendas.toFixed(2)}</span></p>
          <p className="resultado-texto">Total de Despesas: <span style={{color: 'var(--primary-red)'}}>R$ {resultado.totalDespesas.toFixed(2)}</span></p>
          <hr />
          <p className="resultado-texto saldo-final" style={{color: resultado.saldoFinal >= 0 ? 'var(--primary-green)' : 'var(--primary-red)'}}>
            Saldo Final: R$ {resultado.saldoFinal.toFixed(2)}
          </p>
        </div>
      )}
    </div>
  );
}

export default PlanejamentoFinanceiro;
