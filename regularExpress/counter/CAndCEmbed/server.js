const express = require("express")
const app = express()
app.use(express.static(__dirname + "/static"));
app.set('view engine', 'ejs')
app.set('views', __dirname + '/views')

app.get('/', (req, res)=>{
    res.render('index.ejs')
})

app.get('/cars', (req, res)=>{
    res.render('cars.ejs')
})

app.get('/cats', (req, res)=>{
    res.render('cats.ejs')
})

app.get('/cars/new', (req, res)=>{
    res.render('newCar.ejs')
})

app.listen(8000, () => console.log("listening on port 8000"))