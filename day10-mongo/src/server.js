const express = require("express");
const connectDB = require("./config/db");

const app = express();
app.use(express.json());

// connect ke MongoDB
connectDB();

const articleRoutes = require("./routes/articles");
app.use("/articles", articleRoutes);

app.listen(3000, () => console.log("Server running di http://localhost:3000"));
