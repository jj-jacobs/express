const express = require("express");
const app = express();
app.set("view engine", "ejs");
app.engine("ejs", require("ejs").__express);
app.set("views", __dirname + "/public");
app.use(express.static(__dirname + "/public"));
app.use(express.urlencoded({ extended: true }));
const server = app.listen(1337);
const io = require("socket.io")(server);
const session = require("express-session");
app.use(
  session({
    secret: "counter",
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 60000 },
  })
);

app.get("/", (req, res) => {
  res.render("index.ejs");
});
var users = {};
io.on("connection", (socket) => {
  
  socket.emit("newUser");
  socket.on("giveName", (data) => {
    users[Object.keys(users).length] = data;
    console.log("users", users);
  });
});
