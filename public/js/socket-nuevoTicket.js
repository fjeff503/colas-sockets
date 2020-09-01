//comando para establecer la comunicacion
var socket = io();
var label = $('#lblNuevoTicket');

//cuando el server se conecta
socket.on('connect', function () {
    console.log('conectado al servidor');
});

//cuando perdemos conexion con el server
socket.on('disconnect', function () {
    console.log('perdimos conexion con el servidor');
});

//escuchamos el estado actual
socket.on('estadoActual', function (resp) {
    label.text(resp.actual);
});

//listener con jQuery
$('button').on('click', function () {
    //enviamos informacion al backEnd
    socket.emit('siguienteTicket', null, function (siguienteTicket) {
        label.text(siguienteTicket);
    });
});