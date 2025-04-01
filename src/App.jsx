// App.jsx
import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import fetchLootEntries from "./api/fetchLootEntries";
import LootTable from "./components/LootTable";
import PlayerStatsTable from "./components/PlayerStatsTable";
import PageLayout from "./components/PageLayout";
import convertItemStringToWowheadLink from "./utils/wowheadParser";
import classColors from "./utils/classColors";
import Filters from "./components/Filters";
import AnotherPage from "./components/AnotherPage"; // Hinzugefügt

function formatDateToGerman(dateStr) {
  const [year, month, day] = dateStr.split("/");
  return `${day}.${month}.${year}`;
}

function App() {
  const [entries, setEntries] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [filters, setFilters] = useState({ player: '', boss: '', instance: '', difficulty: '', date: '' });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(30); // Number of items per page

  useEffect(() => {
    fetchLootEntries()
      .then((data) => {
        const parsed = data.map((entry) => {
          const classColor = classColors[entry.class?.toUpperCase()] || "text-white";
          return {
            ...entry,
            itemElement: convertItemStringToWowheadLink(entry.item),
            playerElement: <span className={classColor}>{entry.player}</span>,
            dateFormatted: formatDateToGerman(entry.date),
          };
        });

        parsed.sort((a, b) => {
          const dateA = new Date(`${a.date} ${a.time}`);
          const dateB = new Date(`${b.date} ${b.time}`);
          return dateB - dateA;
        });

        setEntries(parsed);
        setFiltered(parsed);
        setLoading(false);
      })
      .catch((err) => {
        setError(err);
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    let filteredData = entries;
    if (filters.player) filteredData = filteredData.filter(e => e.player === filters.player);
    if (filters.boss) filteredData = filteredData.filter(e => e.boss === filters.boss);
    if (filters.instance) filteredData = filteredData.filter(e => e.instance === filters.instance);
    if (filters.difficulty) filteredData = filteredData.filter(e => e.difficulty === filters.difficulty);
    if (filters.date) filteredData = filteredData.filter(e => e.date === filters.date);
    setFiltered(filteredData);
  }, [filters, entries]);

  // Pagination Logic
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filtered.slice(indexOfFirstItem, indexOfLastItem);

  const nextPage = () => setCurrentPage(prev => prev + 1);
  const prevPage = () => setCurrentPage(prev => Math.max(prev - 1, 1));

  const totalPages = Math.ceil(filtered.length / itemsPerPage);

  const extractUnique = (key) => [...new Set(entries.map(e => e[key]).filter(Boolean))];

  return (
    <Router basename="/whatever-tools">
      <PageLayout>
        <Routes>
          <Route path="/" element={
            <div className="flex w-full space-x-6">
              <div className="w-1/6">
                <PlayerStatsTable entries={entries} />
              </div>
              <div className="w-5/6">
                <Filters filters={filters} setFilters={setFilters} extractUnique={extractUnique} />
                {loading && <div className="text-white">Lade Daten ...</div>}
                {error && <div className="text-red-400">Fehler: {error.message}</div>}
                {!loading && !error && <LootTable entries={currentItems} />}
                {/* Pagination Controls */}
                <div className="flex justify-between items-center mt-4">
                  <button onClick={prevPage} className="bg-gray-700 text-gray-200 text-sm p-2 rounded" disabled={currentPage === 1}>
                    Zurück
                  </button>
                  <span className="text-gray-200 text-sm">{currentPage} von {totalPages}</span>
                  <button onClick={nextPage} className="bg-gray-700 text-gray-200 text-sm p-2 rounded" disabled={currentPage === totalPages}>
                    Weiter
                  </button>
                </div>
              </div>
            </div>
          } />
          {/* <Route path="/git" element={<AnotherPage />} /> */}
        </Routes>
      </PageLayout>
    </Router>
  );
}

export default App;
