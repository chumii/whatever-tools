// utils/wowheadParser.jsx
import React from "react";

export default function convertItemStringToWowheadLink(itemString) {
  const match = itemString.match(/Hitem:(\d+):.*?\|h\[(.*?)\]/);
  if (!match) return itemString;

  const itemId = match[1];
  const itemName = match[2];

  return (
    <a
      href={`https://www.wowhead.com/item=${itemId}`}
      data-wowhead={`item=${itemId}`}
      class="text-[#a335ee] hover:underline"
      target="_blank"
      rel="noopener noreferrer"
    >
      {itemName}
    </a>
  );
}
