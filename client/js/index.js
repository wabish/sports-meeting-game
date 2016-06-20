(function() {
    // 生成二维码
    function createQrcode(gameID) {
       $('#qrcode').qrcode({
            text:  window.location.href + 'join?gameID=' + gameID
        }); 
    }

    // 连接socket
    var socket = io();
    var gameID = 0;

    // 初始化房间
    socket.on('init', function(id) {
        if (gameID) {
            return;
        }

        gameID = id;
        createQrcode(gameID);
        socket.emit('login', {
            gameID: gameID
        });
    });

    // 获取玩家名称
    socket.on('login', function(name) {
        var text = $('#name').html();
        if (text) {
            $('#name').append(', ' + name);
        } else {
            $('#name').append(name);
        }
    });

    // // 开始游戏
    $('#startGame').on('click', function() {
        socket.emit('start-game', {
            gameID: gameID
        });
    });
})();