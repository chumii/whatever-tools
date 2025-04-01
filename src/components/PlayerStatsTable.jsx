import React from "react";
import classColors from "../utils/classColors";  // Importiere die classColors

function PlayerStatsTable({ entries }) {
  // Hardcoded Instance, für die die Statistik erstellt wird
  const targetInstance = "Liberation of Undermine";

  // Filtere nur die Einträge mit den gewünschten "response" Werten und der Instanz
  const filteredEntries = entries.filter((entry) =>
    ["Upgrade", "4-Set", "2-Set", "Catalyst"].includes(entry.response) && entry.instance === targetInstance
  );

  // Zähle die Items pro Spieler
  const playerStats = filteredEntries.reduce((acc, entry) => {
    const { player, difficulty } = entry;
    if (!acc[player]) {
      acc[player] = { total: 0, M: 0, H: 0, N: 0, class: entry.class };  // Füge class hinzu
    }
    acc[player].total += 1;
    if (difficulty === "Mythic") acc[player].M += 1;
    if (difficulty === "Heroic") acc[player].H += 1;
    if (difficulty === "Normal") acc[player].N += 1;
    return acc;
  }, {});

  // Konvertiere das playerStats Objekt in ein Array für die Tabelle
  const playerStatsArray = Object.keys(playerStats).map(player => ({
    player,
    class: playerStats[player].class,  // Füge class hinzu
    ...playerStats[player]
  }));

  // Sortiere das Array alphabetisch nach dem Spielernamen
  playerStatsArray.sort((a, b) => a.player.localeCompare(b.player));

  return (
    <div className="overflow-x-auto rounded-lg shadow bg-gray-800 text-sm text-gray-200">
      <table className="min-w-full">
        <thead className="bg-gray-700 text-gray-300">
          <tr>
            <th className="px-4 py-2 text-left">Player</th>
            <th className="px-4 py-2 text-left">Total</th>
            <th className="px-4 py-2 text-left">M</th>
            <th className="px-4 py-2 text-left">H</th>
            <th className="px-4 py-2 text-left">N</th>
          </tr>
        </thead>
        <tbody>
          {playerStatsArray.map((playerStat, idx) => {
            const classColor = classColors[playerStat.class?.toUpperCase()] || "text-white";  // Setze classColor für den Spieler
            return (
              <tr key={idx} className="even:bg-gray-750 hover:bg-gray-700 transition">
                <td className="px-4 py-2 whitespace-nowrap">
                  <span className={classColor}>{playerStat.player}</span>
                </td>
                <td className="px-4 py-2 whitespace-nowrap">{playerStat.total}</td>
                <td className="px-4 py-2 whitespace-nowrap">{playerStat.M}</td>
                <td className="px-4 py-2 whitespace-nowrap">{playerStat.H}</td>
                <td className="px-4 py-2 whitespace-nowrap">{playerStat.N}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export default PlayerStatsTable;
