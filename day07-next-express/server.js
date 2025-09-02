const express = require("express");
const app = express();

app.use(express.json()); // middleware parsing JSON

// Route dasar
app.get("/", (req, res) => {
  res.send("Welcome to Express Day 7 🚀");
});

// 1. Route Parameter (/users/123)
app.get("/users/:id", (req, res) => {
  const userId = req.params.id;
  res.json({ message: `Detail user dengan ID: ${userId}` });
});

// 2. Query Parameter (/search?keyword=nodejs)
app.get("/search", (req, res) => {
  const keyword = req.query.keyword;
  res.json({ message: `Kamu mencari: ${keyword}` });
});

// 3. Modular Routes (contoh products.js)
const productRoutes = require("./routes/products");
app.use("/products", productRoutes);

const articleRoutes = require("./routes/articles");
app.use("/articles", articleRoutes);


app.listen(3000, () => console.log("Server running on http://localhost:3000"));
