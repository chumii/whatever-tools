// components/Filters.jsx
import React from "react";

function Filters({ filters, setFilters, extractUnique }) {
  return (
    <div className="flex flex-wrap gap-4 mb-4">
      <select onChange={(e) => setFilters(f => ({ ...f, player: e.target.value }))} className="bg-gray-700 text-white p-2 rounded text-sm">
        <option value="">Player</option>
        {extractUnique('player').map(opt => <option key={opt} value={opt}>{opt}</option>)}
      </select>
      <select onChange={(e) => setFilters(f => ({ ...f, boss: e.target.value }))} className="bg-gray-700 text-white p-2 rounded text-sm">
        <option value="">Boss</option>
        {extractUnique('boss').map(opt => <option key={opt} value={opt}>{opt}</option>)}
      </select>
      <select onChange={(e) => setFilters(f => ({ ...f, instance: e.target.value }))} className="bg-gray-700 text-white p-2 rounded text-sm">
        <option value="">Instance</option>
        {extractUnique('instance').map(opt => <option key={opt} value={opt}>{opt}</option>)}
      </select>
      <select onChange={(e) => setFilters(f => ({ ...f, difficulty: e.target.value }))} className="bg-gray-700 text-white p-2 rounded text-sm">
        <option value="">Difficulty</option>
        {extractUnique('difficulty').map(opt => <option key={opt} value={opt}>{opt}</option>)}
      </select>
      <select onChange={(e) => setFilters(f => ({ ...f, date: e.target.value }))} className="bg-gray-700 text-white p-2 rounded text-sm">
        <option value="">Date</option>
        {extractUnique('date').map(opt => <option key={opt} value={opt}>{opt}</option>)}
      </select>
    </div>
  );
}

export default Filters;
