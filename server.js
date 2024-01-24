const express = require("express");
const mongoose = require("mongoose");
const Article = require("./models/article");
const articleRouter = require("./routes/articles");
const methodOverride = require("method-override");
const dotenv = require("dotenv");
const app = express();

dotenv.config();

mongoose.connect(
  "mongodb+srv://shreyashchandra123:ReDJPvY7RCh1Nahd@shreyash.3mh5ouf.mongodb.net/"
);

app.set("view engine", "ejs");

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(methodOverride("_method"));

app.get("/", async (req, res) => {
  const articles = await Article.find().sort({ createdAt: "desc" });
  res.render("articles/index", { articles: articles });
  // res.json({ data: articles });
});
app.use("/articles", articleRouter);

app.listen(process.env.PORT);
