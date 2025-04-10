// utils/wowheadParser.jsx
import React from "react";

function parseItemLink(itemString) {
  // Extrahiere item_id
  const itemIdMatch = itemString.match(/\|Hitem:(\d+)/);
  if (!itemIdMatch) return null;
  
  // Extrahiere item_name
  const itemNameMatch = itemString.match(/\|h\[(.*?)\]\|h/);
  if (!itemNameMatch) return null;
  
  // Versuche, bonus_ids zu extrahieren (optional)
  let bonusIds = [];
  const bonusMatch = itemString.match(/:(\d+):(\d+)(?::.*?):(\d+(?::\d+)*)/);
  if (bonusMatch && bonusMatch[3]) {
    bonusIds = bonusMatch[3].split(':').map(Number);
  }
  
  return {
    item_id: itemIdMatch[1],
    item_name: itemNameMatch[1],
    bonus_ids: bonusIds
  };
}

// Diese Funktion erzeugt den Wowhead-Link aus dem Item-Link
export default function convertItemStringToWowheadLink(itemString) {
  console.log("Item String:", itemString);  // Ausgabe des Itemstrings

  const parsedData = parseItemLink(itemString);
  console.log("Parsed Data:", parsedData);  // Ausgabe von parsedData zur Kontrolle

  if (!parsedData) return itemString;  // Wenn der Link nicht gültig ist, gebe den originalen String zurück

  let itemUrl = `https://www.wowhead.com/item=${parsedData.item_id}`;

  // Füge Bonus-IDs zum URL hinzu, falls vorhanden
  if (parsedData.bonus_ids.length > 0) {
    itemUrl += "&bonus=" + parsedData.bonus_ids.join(":");
  }

  return (
    <a
      href={itemUrl}
      data-wowhead={`item=${parsedData.item_id}`}
      className="text-[#a335ee] hover:underline"
      target="_blank"
      rel="noopener noreferrer"
    >
      {parsedData.item_name} {/* Item-Name aus dem Link */}
    </a>
  );
}
