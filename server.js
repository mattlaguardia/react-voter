var express = require('express');

var app = express();

var connections = [];

// static is middleware //
app.use(express.static('./public'));
// static middleware for bootstrap //
app.use(express.static('./node_modules/bootstrap/dist'));

var server = app.listen(3000);

var io = require('socket.io').listen(server);

io.sockets.on('connection', function(socket) {

  socket.once('disconnect', function() {
    connections.splice(connections.indexOf(socket), 1);
    socket.disconnect();
    console.log('Disconnected: %s sockets remaining.', connections.length);
  })

  connections.push(socket);
  console.log('Connected: %s sockets connected', connections.length);
})
console.log("App Server is running on port: 3000");
