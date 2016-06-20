var express = require("express");
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var path = require('path');

var clientPath = path.join(__dirname, '../client');

app.use(express.static(clientPath));

app.get('/', function(req, res){
    res.sendFile(clientPath + '/index.html');
});

app.get('/join', function(req, res) {
    res.sendFile(clientPath + '/join.html');
});

http.listen(3000, function(){
    console.log('listening on *:3000');
});

// socket
io.on('connection', function(socket){
    // 因为'/#'字符串在url参数中有影响，所以截取掉
    var gameID = socket.id.slice(2);

    // PC端生成二维码
    // io.emit('init', gameID);
    
    // 移动端输入玩家名称登录
    socket.on('login', function(msg) {
        socket.join(msg.gameID);

        if (msg.name) {
            io.sockets.in(msg.gameID).emit('login', msg.name);
        }
    });

    // PC端开始游戏
    socket.on('start-game', function(msg) {
        io.sockets.in(msg.gameID).emit('start-game');
    });
});
