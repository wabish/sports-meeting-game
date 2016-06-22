(function() {
    /**
     * 获取url中的参数
     * @param name 参数名
     */
    function getUrlParam(name) {
        // 构造一个含有目标参数的正则表达式对象
        var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)');

        // 匹配目标参数
        var r = window.location.search.substr(1).match(reg);

        if (r !== null) {
            return unescape(r[2]);
        }
        return null;
    }

    var gameID = getUrlParam('gameID');
    var socket = io();
    var name = '';

    console.log(gameID);

    // 提交名称
    $('form').submit(function(){
        name = $('#m').val();

        socket.emit('login', {
            gameID: gameID,
            name: name
        });
        $('#m').val('');

        $('#joinGame').hide();
        $('#readyGame').show();

        return false;
    });

    // 开始游戏
    socket.on('start-game', function() {
        $('#readyGame').hide();
        $('#startGame').show();
    });

    $('#playBtn').on('click', function() {
        socket.emit('play', {
            gameID: gameID,
            name: name
        });
    });
})();
