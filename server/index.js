require("dotenv").config();
const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const store = new session.MemoryStore();
const Mongoose = require("mongoose");
const app = express();
const PORT = process.env.PORT || 8080;

app.use(
    cors({
      origin: "http://localhost:3000",
      methods: "GET,POST,PUT,DELETE",
      credentials: true,
      // allowedHeaders: true
    })
  );

const userRoute = require("./routes/user");
const articleRoute = require("./routes/article");
const loginRoute = require("./routes/login");
const signupRoute = require("./routes/signup");
const logoutRoute = require("./routes/logout");

Mongoose.connect(process.env.db_url);
const db = Mongoose.connection;

db.on("erorr", (err) => console.log(err));
db.on("open", () => console.log("Connected to DB"));

app.use(cookieParser());
app.use(
  session({
    name: "parallelVortex",
    secret: process.env.sessionSecret,
    resave: true,
    saveUninitialized: false,
    store,
    cookie: {
        sameSite: "strict",
    },
})
);
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use((req, res, next) => {
  console.log(store);
  next();
});

app.use("/user", userRoute);
app.use("/article", articleRoute);
app.use("/login", loginRoute);
app.use("/signup", signupRoute);
app.use("/logout", logoutRoute);

app.get("/hello", (req, res) => {
  res.send("World");
});

app.listen(PORT, console.log(`Listening to ${PORT}`));
