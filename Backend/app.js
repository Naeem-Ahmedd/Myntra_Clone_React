const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const { getStoredItems, storeItems } = require("./data/items");

const app = express();

const corsOptions = {
  origin: process.env.CORS_ORIGIN || "*",
  methods: ["GET", "POST"],
  credentials: true,
};

app.use(cors(corsOptions));

app.use(bodyParser.json());

app.get("/", (req, res) => {
  res.send("Welcome to the API. Use /items to access the items.");
});

app.get("/items", async (req, res) => {
  try {
    const storedItems = await getStoredItems();
    await new Promise((resolve) => setTimeout(resolve, 10));
    res.json({ items: storedItems });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error retrieving items.", error: error.message });
  }
});

app.get("/items/:id", async (req, res) => {
  const storedItems = await getStoredItems();
  const item = storedItems.find((item) => item.id === req.params.id);
  res.json({ item });
});

app.post("/items", async (req, res) => {
  const existingItems = await getStoredItems();
  const itemData = req.body;
  const newItem = {
    ...itemData,
    id: Math.random().toString(),
  };
  const updatedItems = [newItem, ...existingItems];
  await storeItems(updatedItems);
  res.status(201).json({ message: "Stored new item.", item: newItem });
});

module.exports = app;
