const express = require("express");
const app = express();
const articleRoutes = require("./routes/articles");

app.use(express.json()); // <<< penting untuk parsing JSON body
app.use("/articles", articleRoutes);

app.listen(3000, () => {
  console.log("Server running di http://localhost:3000");
});
