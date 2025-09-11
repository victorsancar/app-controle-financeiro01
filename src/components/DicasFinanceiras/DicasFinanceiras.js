import React from 'react';

/**
 * Componente que exibe uma lista de dicas de educação financeira.
 */
export default function DicasFinanceiras() {
  const dicas = [
    { id: 1, titulo: "Crie um Orçamento", texto: "O primeiro passo para a saúde financeira é saber para onde seu dinheiro vai. Acompanhe suas receitas e despesas." },
    { id: 2, titulo: "Pague suas Dívidas", texto: "Priorize o pagamento de dívidas com juros altos, como cartões de crédito. Isso libera mais dinheiro para seus objetivos." },
    { id: 3, titulo: "Crie uma Reserva de Emergência", texto: "Tenha o equivalente a 3 a 6 meses de suas despesas guardado em um local de fácil acesso para imprevistos." },
    { id: 4, titulo: "Invista para o Futuro", texto: "Não deixe seu dinheiro parado. Aprenda sobre investimentos que se alinhem com seus objetivos de longo prazo." },
    { id: 5, titulo: "Estabeleça Metas Financeiras", texto: "Ter objetivos claros (comprar uma casa, viajar) te ajuda a manter o foco e a motivação para economizar." },
  ];

  return (
    <div className="card">
      <h2 className="card-title">Dicas para sua Saúde Financeira</h2>
      <div style={{ display: 'grid', gap: '1.5rem' }}>
        {dicas.map(dica => (
          <div key={dica.id} style={{ borderLeft: '4px solid #007bff', paddingLeft: '1rem' }}>
            <h3 style={{ color: '#0056b3' }}>{dica.titulo}</h3>
            <p>{dica.texto}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

