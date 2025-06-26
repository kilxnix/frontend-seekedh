import React, { useState } from 'react';
import Card from './Card';
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
      {!loading && cards.length === 0 && !error && (
        <p className="mt-4">No cards found.</p>
      )}

      <div className="mt-6 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {cards.map((card, index) => (
          <Card key={index} card={card} />
        ))}
      </div>
    </div>
  );
}

export default MTGSearcher;