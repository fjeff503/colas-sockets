//comando para establecer la comunicacion
var socket = io();

var searchParams = new URLSearchParams(window.location.search);

if (!searchParams.has('escritorio')) {
    window.location = 'index.html'
    throw new Error('El escritorio es necesario');
}

var escritorio = searchParams.get('escritorio');
console.log(escritorio);

var label = $('small');

$('h1').text('Escritorio ' + escritorio);

//listener con jQuery
$('button').on('click', function () {
    socket.emit('atenderTicket', { escritorio: escritorio }, function (resp) {

        if (resp === 'No hay tickets') {
            alert(resp);
            label.text(resp);
            return;
        }
        label.text('ticket numero ' + resp.numero);
    });
});

//cuando el server se conecta
socket.on('connect', function () {
    console.log('conectado al servidor');
});

//cuando perdemos conexion con el server
socket.on('disconnect', function () {
    console.log('perdimos conexion con el servidor');
});

