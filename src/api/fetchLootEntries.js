const TURSO_URL = import.meta.env.VITE_TURSO_URL;
const AUTH_TOKEN = import.meta.env.VITE_AUTH_TOKEN;

export default async function fetchLootEntries() {
  const res = await fetch(TURSO_URL, {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${AUTH_TOKEN}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      requests: [
        {
          type: "execute",
          stmt: {
            sql: "SELECT player, realm, class, item, instance, boss, date, time, response, note, difficulty FROM loot_entries ORDER BY date DESC, time DESC LIMIT 100;"
          }
        },
        { type: "close" }
      ]
    })
  });

  const json = await res.json();
  const result = json?.results?.[0]?.response?.result;
  if (!result) return [];

  const columns = result.cols.map(col => col.name);
  const rows = result.rows;

  // Wandelt jede Zeile in ein Objekt um: { player: "xyz", realm: "abc", ... }
  const parsed = rows.map(row =>
    row.reduce((acc, cell, i) => {
      acc[columns[i]] = cell?.value ?? null;
      return acc;
    }, {})
  );

  return parsed;
}
