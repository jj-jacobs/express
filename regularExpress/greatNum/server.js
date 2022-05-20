const express = require("express");
const app = express();
const session = require("express-session");
app.set("view engine", "ejs");
app.engine("ejs", require("ejs").__express);
app.set("views", __dirname + "/views");
app.use(express.static(__dirname + "/static"));
app.use(express.urlencoded({ extended: true }));
app.use(
  session({
    secret: "counter",
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 60000 },
  })
);

app.get("/", (req, res) => {
  var gues = req.session.guess;
  const rand = req.session.random;
  var ans = "please take a guess";
  if (gues && gues == rand) {
    ans = "correct";
    req.session.destroy();
  } else if (gues && gues > rand) {
    ans = "too high";
  } else if (gues && gues < rand) {
    ans = "too low";
  }
  res.render("index.ejs", { ans: ans });
});

app.post("/guess", (req, res) => {
  if (!req.session.random) {
    req.session.random = Math.floor(Math.random() * 100);
  }
  console.log(req.session.random);
  req.session.guess = req.body.guess;
  res.redirect("/");
});

app.listen(8000, () => console.log("serving on 8000"));
