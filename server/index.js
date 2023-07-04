require("dotenv").config();
const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const Mongoose = require("mongoose");
const app = express();
const PORT = process.env.PORT || 8080;

const userRoute = require("./routes/user")
const articleRoute = require("./routes/article")
const loginRoute = require("./routes/login")
const signupRoute = require("./routes/signup")
const logoutRoute = require("./routes/logout")

Mongoose.connect(process.env.db_url);
const db = Mongoose.connection;

db.on("erorr", (err) => console.log(err));
db.on("open", ()=>console.log("Connected to DB"));

app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));

app.use('/user',userRoute)
app.use('/article',articleRoute)
app.use('/login',loginRoute)
app.use('/signup',signupRoute)
app.use('/logout',logoutRoute)

app.use(cors({
    origin: "http://localhost:3000",
    methods: "GET,POST,PUT,DELETE",
    credentials: true
}))

app.get('/hello',(req,res)=>{
    res.send('World')
})

app.listen(PORT, console.log(`Listening to ${PORT}`));
