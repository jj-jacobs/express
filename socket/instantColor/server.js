const express = require("express");
const app = express();
app.set("view engine", "ejs");
app.engine("ejs", require("ejs").__express);
app.set("views", __dirname + "/public");
app.use(express.static(__dirname + "/public"));
app.use(express.urlencoded({ extended: true }));
const server = app.listen(1337);
const io = require("socket.io")(server);
var color = { color: "green" };
var count = 0
app.get("/", (req, res) => {
  res.render("index.ejs");
});

io.on("connection", (socket) => {
  socket.emit("showColorGreen", {color: 'green'});
  socket.on("changeColorRed", () => {
    color.color = "red";
    console.log(color.color);
    io.sockets.emit("showColorRed", { color: 'red' });
  });
  socket.on("changeColorGreen", () => {
    console.log(color.color);
    color.color = "green";
    io.sockets.emit("showColorGreen", { color: 'green'});
  });

  socket.emit("getCount", { num: count });
  socket.on("plusOne", () => {
    count++;
    console.log("in the server plus one", count);
    io.sockets.emit("countUpdated", { num: count });
  });
  socket.on("reset", () => {
    count = 0;
    console.log("reseting in server", count);
    io.sockets.emit("countUpdated", { num: count });
  });
});
