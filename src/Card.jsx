import React from 'react';

function Card({ card }) {
  return (
    <div className="bg-gray-800 p-4 rounded-lg shadow">
      {card.image_url && (
        <img src={card.image_url} alt={card.name} className="w-full rounded mb-2" />
      )}
      <h3 className="font-bold text-lg">{card.name}</h3>
      <p className="text-sm mb-1">{card.type_line}</p>
      <p className="text-sm mb-2">{card.oracle_text}</p>
      <p className="text-green-300 font-semibold">${card.prices_usd}</p>
    </div>
  );
}

export default Card;
