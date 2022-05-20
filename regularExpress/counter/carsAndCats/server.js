const express = require('express')
const app = express()
app.use(express.static(__dirname + "/static"));
app.get('/', (req, res) => {
   res.render('index.html');
});
app.get('/cars.html', (req,res)=>{
    res.render('cars.html')
})

app.listen(8000, () => console.log("listening on port 8000"));