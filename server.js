var express = require('express')
var app = express()
var _ = require('underscore')

var connections = []
var title = 'Untitled Presentation'
var audience = []



// static is middleware //
app.use(express.static('./public'))
// static middleware for bootstrap //
app.use(express.static('./node_modules/bootstrap/dist'))

var server = app.listen(3000);
///////////////
// Socket io //
///////////////
var io = require('socket.io').listen(server)

io.sockets.on('connection', function(socket) {

  socket.once('disconnect', function() {

    var member = _.findWhere(audience, { id: this.id })

    if(member) {
      audience.splice(audience.indexOf(member), 1)
      io.sockets.emit('audience', audience)
      console.log("Left: %s (%s audience members)", member.name, audience.length)
    }

    connections.splice(connections.indexOf(socket), 1)
    socket.disconnect()
    console.log('Disconnected: %s sockets remaining.', connections.length)
  })
  socket.on("join", function(payload) {
    var newMember = {
      id: this.id,
      name: payload.name
    }
    this.emit('joined', newMember)
    audience.push(newMember)

    // broadcasting to all sockets
    io.sockets.emit('audience', audience)
    console.log("Audience joined: %s", payload.name)
  })
  socket.emit('Welcome', {
    title: title
  })
  connections.push(socket)
  console.log('Connected: %s sockets connected', connections.length)
})
console.log("App Server is running on port: 3000")
