const express = require('express')
const app = express()
app.use(express.static(__dirname + "/static"));
app.set('view engine', 'ejs')
app.set('views', __dirname + '/views')
app.engine('ejs', require('ejs').__express);

app.get('/', (req, res)=>{
    res.render('cats.ejs')
})

app.get('/cuddles', (req, res)=>{
    var cats={
        name: 'cuddles',
        favFood: ['tacos', 'pandas'],
        age: 2
    }
    res.render('details.ejs', {cats:cats})
})

app.get('/sarah', (req, res)=>{
    var cats={
        name: 'sarah',
        favFoods: ['burritos', 'panda'],
        age: 22
    }
    res.render('details.ejs', {cats:cats})
})

app.listen(8000, ()=> console.log('serving on port 8000'))