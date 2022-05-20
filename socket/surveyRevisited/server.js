const express = require("express");
const app = express();
app.set("view engine", "ejs");
app.engine("ejs", require("ejs").__express);
app.set("views", __dirname + "/public");
app.use(express.static(__dirname + "/public"));
app.use(express.urlencoded({ extended: true }));
const server = app.listen(1337);
const io = require('socket.io')(server);

var counter = 0;

app.get('/', (req, res)=>{
  res.render('index.ejs')
})

io.on('connection', function (socket) { //2
  console.log('a client has connected')
  socket.emit('greeting', { msg: 'Greetings, from server Node, brought to you by Sockets! -Server' }); //3
  socket.on('thankyou', function (data) { //7
    console.log(data.msg); //8 (note: this log will be on your server's terminal)
  });
  socket.on('registered', (data)=>{
    console.log(data.name, data.dojo);
    socket.emit('randomNum', {'num': Math.floor(Math.random() * 1000)})
    socket.emit('info', data)
  })
    
});