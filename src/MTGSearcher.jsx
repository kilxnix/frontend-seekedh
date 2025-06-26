import React, { useState } from 'react';
import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'https://837349c8-5505-4011-b174-e9237ce65490-00-2iajakatkpxxf.spock.replit.dev';

function MTGSearcher() {
  const [query, setQuery] = useState('');
  const [cards, setCards] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const searchCards = async () => {
    setLoading(true);
    setError('');
    try {
      const response = await axios.post(`${API_BASE_URL}/api/rag/enhanced-search`, {
        query,
        top_k: 20,
        include_images: true,
      });

      if (response.data.success) {
        setCards(response.data.cards);
      } else {
        setError('Search was unsuccessful.');
      }
    } catch (err) {
      setError('Error fetching cards.');
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center py-10">
      <h1 className="text-4xl mb-5">MTG Card Searcher</h1>
      <div className="flex">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="p-2 rounded-l-lg text-black"
          placeholder="Search for Magic Cards"
        />
        <button onClick={searchCards} className="bg-blue-600 px-4 rounded-r-lg">
          Search
        </button>
      </div>

      {loading && <p className="mt-4">Loading...</p>}
      {error && <p className="mt-4 text-red-400">{error}</p>}

      <div className="mt-6 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {cards.map((card, index) => (
          <div key={index} className="bg-gray-800 p-3 rounded-lg">
            <img src={card.image_url} alt={card.name} className="rounded mb-2" />
            <h3 className="font-bold">{card.name}</h3>
            <p>{card.type_line}</p>
            <p className="text-sm">{card.oracle_text}</p>
            <p className="text-green-300">${card.prices_usd}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default MTGSearcher;