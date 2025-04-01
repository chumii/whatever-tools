const TURSO_URL = "https://whateverloothistory-bambule.aws-us-east-1.turso.io/v2/pipeline";
const AUTH_TOKEN = "eyJhbGciOiJFZERTQSIsInR5cCI6IkpXVCJ9.eyJhIjoicnciLCJpYXQiOjE3NDM0NjIyNTcsImlkIjoiZTM0OWI2ZDAtNTQ1NC00YWZhLThmZjctZjU2MjRjZmNjYjFiIiwicmlkIjoiMDRmYzk0NGUtMjRkMi00ZDEzLWEyMzUtOTc4MTFlMjk0YmM1In0.xOZSfhPhTHzfO8tfqkEThO3VoIMf6VbgDdwYbTPCMaCVuHyvNUeaG2jGX08lr_Ya5DVMkAYPTsoYYEEXhgypAQ";

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
