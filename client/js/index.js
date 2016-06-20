(function() {
    // 生成二维码
    function createQrcode(gameID) {
       $('#qrcode').qrcode({
            text:  window.location.href + 'join?gameID=' + gameID
        }); 
    }

    // 生成唯一标识
    function uuid(len, radix) {
        var chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'.split('');
        var uuid = [], i;
        radix = radix || chars.length;

        if (len) {
            // Compact form
            for (i = 0; i < len; i++) uuid[i] = chars[0 | Math.random()*radix];
        } else {
            // rfc4122, version 4 form
            var r;

            // rfc4122 requires these characters
            uuid[8] = uuid[13] = uuid[18] = uuid[23] = '-';
            uuid[14] = '4';

            // Fill in random data.  At i==19 set the high bits of clock sequence as
            // per rfc4122, sec. 4.1.5
            for (i = 0; i < 36; i++) {
                if (!uuid[i]) {
                    r = 0 | Math.random()*16;
                    uuid[i] = chars[(i == 19) ? (r & 0x3) | 0x8 : r];
                }
            }
        }

        return uuid.join('');
    }

    // 连接socket
    var socket = io();
    var gameID = uuid(8, 10);
    console.log(gameID);
    createQrcode(gameID);

    // 初始化房间
    socket.emit('login', {
        gameID:gameID    });

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