import React, { useState } from 'react';

/**
 * Componente que calcula juros compostos.
 */
export default function CalculadoraJuros() {
  const [principal, setPrincipal] = useState('');
  const [taxa, setTaxa] = useState('');
  const [tempo, setTempo] = useState('');
  const [resultado, setResultado] = useState(null);

  const calcular = (e) => {
    e.preventDefault();
    const p = parseFloat(principal);
    const r = parseFloat(taxa) / 100; // Taxa convertida para decimal
    const t = parseFloat(tempo);

    if (isNaN(p) || isNaN(r) || isNaN(t)) {
      alert("Por favor, insira valores numéricos válidos.");
      return;
    }

    // Fórmula dos juros compostos: M = P * (1 + r)^t
    const montante = p * Math.pow((1 + r), t);
    setResultado(montante);
  };

  return (
    <div className="card">
      <h2 className="card-title">Calculadora de Juros Compostos</h2>
      <form onSubmit={calcular} className="form-container">
        <div style={{ display: 'grid', gap: '1rem' }}>
          <input className="form-input" type="number" value={principal} onChange={e => setPrincipal(e.target.value)} placeholder="Valor Principal (R$)" />
          <input className="form-input" type="number" value={taxa} onChange={e => setTaxa(e.target.value)} placeholder="Taxa de Juros Anual (%)" />
          <input className="form-input" type="number" value={tempo} onChange={e => setTempo(e.target.value)} placeholder="Tempo (em anos)" />
          <button className="form-button" type="submit">Calcular</button>
        </div>
      </form>
      
      {resultado !== null && (
        <div className="resultado-container" style={{ textAlign: 'center' }}>
          <h3>Resultado</h3>
          <p>O montante final após {tempo} anos será de:</p>
          <h2 className="saldo-final">R$ {resultado.toFixed(2)}</h2>
        </div>
      )}
    </div>
  );
}

