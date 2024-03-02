const express = require("express");
const path = require("path");
const app = express();
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");

const Comment = require("./models/comment");

const userRoute = require("./routes/user");
const blogRoute = require("./routes/blog");
const { log } = require("console");
const { checkForAuthenticationCookie } = require("./middleware/authentication");

const PORT = 8000;

mongoose
  .connect("mongodb://localhost:27017/blogify")
  .then(() => console.log("MongoDb connected"))
  .catch((err) => console.error("MongoDb connection error:", err));

app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));

app.use(express.urlencoded({ extended: false }));
app.use(express.json()); // Add this line to parse JSON payloads
app.use(cookieParser());
app.use(checkForAuthenticationCookie("token"));
app.use(express.static(path.resolve("./public")));

app.get("/", async (req, res) => {
  //console.log("User in home route:", req.user);
  const allBlogs = await Blog.find({});
  res.render("home", {
    user: req.user,
    blogs: allBlogs,
  });
});

app.use("/user", userRoute);

app.use("/blog", blogRoute);

app.listen(PORT, () => console.log(`Server started at ${PORT}`));
