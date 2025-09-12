const express = require("express");
const connectDB = require("./config/db");

const app = express();
app.use(express.json());

// connect ke MongoDB
connectDB();

const articleRoutes = require("./routes/articles");
app.use("/articles", articleRoutes);

const commentRoutes = require("./routes/comments");
app.use("/comments", commentRoutes);

const authRoutes = require("./routes/auth");
app.use("/auth", authRoutes);

const postRequest = require("./routes/posts");
app.use("/posts", postRequest);

const profileRequest = require("./routes/profile");
app.use("/profile", profileRequest);

const adminRoutes = require("./routes/admin");
app.use("/admin", adminRoutes);

const userRoutes = require("./routes/user");
app.use("/user", userRoutes);

app.listen(3000, () => console.log("Server running di http://localhost:3000"));
