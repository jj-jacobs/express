const express = require("express");
const app = express();
const session = require("express-session");
app.set("view engine", "ejs");
app.engine("ejs", require("ejs").__express);
app.set("views", __dirname + "/views");
app.use(express.static(__dirname + "/static"));
app.use(
  session({
    secret: "counter",
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 60000 },
  })
);

app.get("/", (req, res) => {
  if(req.session.count){
    req.session.count++;
  }
  else{
    req.session.count = 1
  }
  res.render("index.ejs", {result:req.session.count});
});

app.listen(8000, () => console.log("listening port 8000"));
