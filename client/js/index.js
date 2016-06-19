(function() {
    $('#qrcode').qrcode({
        text:  window.location.href + 'join'
    });

    var socket = io();
    socket.on('login', function(name){
        $('#name').html(name);
    });
})();