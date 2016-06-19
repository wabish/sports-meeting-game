var express = require("express");
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var path = require('path');

var clientPath = path.join(__dirname, '../client');

app.use(express.static(clientPath));

app.get('/', function(req, res){
    res.sendfile(path.join(clientPath, 'index.html'));
});

app.get('/join', function(req, res) {
    res.sendfile(path.join(clientPath, 'join.html'));
})

http.listen(3000, function(){
    console.log('listening on *:3000');
});

// socket
io.on('connection', function(socket){

    socket.on('login', function(name) {
        console.log(name);
        io.emit('login', name);
    });

    // socket.on('chat message', function(msg) {
    //     console.log(msg);
    //     io.sockets.in('game').emit('chat message', msg);
    // });

  // socket.on('chat message', function(msg){
  //   // console.log(socket.id);
  //   io.emit('chat message', msg);
  // });
});
