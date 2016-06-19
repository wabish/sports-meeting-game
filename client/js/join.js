(function() {
    var socket = io();

    $('form').submit(function(){
        socket.emit('login', $('#m').val());
        $('#m').val('');
        return false;
    });
})();