const fs = require("node:fs/promises");
const path = require("node:path");

const dataFilePath = path.join(__dirname, "..", "items.json");

async function getStoredItems() {
  const rawFileContent = await fs.readFile(dataFilePath, { encoding: "utf-8" });
  const data = JSON.parse(rawFileContent);
  const storedItems = data.items ?? [];
  return storedItems;
}

function storeItems(items) {
  return fs.writeFile(dataFilePath, JSON.stringify({ items: items || [] }));
}

exports.getStoredItems = getStoredItems;
exports.storeItems = storeItems;
