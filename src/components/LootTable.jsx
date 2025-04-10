// components/LootTable.jsx
import React from "react";

function LootTable({ entries }) {
  if (!entries || entries.length === 0) {
    return <div className="text-gray-400">Keine Einträge gefunden.</div>;
  }

  return (
    <div className="overflow-x-auto rounded-lg shadow w-full">
      <table className="min-w-full bg-gray-800 text-sm text-gray-200">
        <thead className="bg-gray-700 text-gray-300">
          <tr>
            <th className="px-4 py-2 text-left">Date</th>
            <th className="px-4 py-2 text-left">Player</th>
            <th className="px-4 py-2 text-left">Item</th>
            <th className="px-4 py-2 text-left">Response</th>
            <th className="px-4 py-2 text-left">Note</th>
            <th className="px-4 py-2 text-left">Boss</th>
            <th className="px-4 py-2 text-left">Instance</th>
            <th className="px-4 py-2 text-left">Difficulty</th>
          </tr>
        </thead>
        <tbody>
          {entries.map((entry, idx) => (
            <tr key={idx} className="even:bg-gray-750 hover:bg-gray-700 transition">
              <td className="px-4 py-2 whitespace-nowrap text-sm">{entry.dateFormatted}</td>
              <td className="px-4 py-2 whitespace-nowrap text-sm">{entry.playerElement}</td>
              <td className="px-4 py-2 text-sm">{entry.itemElement}</td>
              <td className="px-4 py-2 whitespace-nowrap text-sm">{entry.response}</td>
              <td className="px-4 py-2 text-sm">{entry.note}</td>
              <td className="px-4 py-2 whitespace-nowrap text-sm">{entry.boss}</td>
              <td className="px-4 py-2 whitespace-nowrap text-sm">{entry.instance}</td>
              <td className="px-4 py-2 whitespace-nowrap text-sm">{entry.difficulty}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default LootTable;
