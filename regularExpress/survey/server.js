const express = require("express");
const app = express();
app.set("view engine", "ejs");
app.engine("ejs", require("ejs").__express);
app.set("views", __dirname + "/views");
app.use(express.static(__dirname + "/static"));
app.use(express.urlencoded({extended: true}));

app.get("/", (req, res) => {
  res.render("index.ejs");
});

app.post("/result", (req, res) => {
    var data = {
        name: req.body.name,
        dojo: req.body.dojo
    }
  res.render("results.ejs", {data:data});
});

app.listen(8000, () => "running on port 8000");
