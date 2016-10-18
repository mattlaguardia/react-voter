var express = require('express')
var app = express()
var _ = require('underscore')

var connections = []
var title = 'Untitled Presentation'
var audience = []
var speaker = {}
var questions = require("./questions")
var currentQuestion = false


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
    } else if (this.id === speaker.id) {
      console.log("%s has left. '%s' is over.", speaker.name, title)
      speaker = {}
      title = "Untitled Presentation"
      io.sockets.emit('end', {title: title, speaker: ''})
    }

    connections.splice(connections.indexOf(socket), 1)
    socket.disconnect()
    console.log('Disconnected: %s sockets remaining.', connections.length)
  })
  socket.on("join", function(payload) {
    var newMember = {
      id: this.id,
      name: payload.name,
      type: 'member'
    }
    this.emit('joined', newMember)
    audience.push(newMember)

    // broadcasting to all sockets
    io.sockets.emit('audience', audience)
    console.log("Audience joined: %s", payload.name)
  })
  socket.on('start', function(payload) {
    speaker.name = payload.name
    speaker.id = this.id
    speaker.type = 'speaker'
    this.emit('joined', speaker)
    io.sockets.emit('start', { title: payload.title, speaker: speaker.name })
    console.log("Presentation Started: '%s' by %s", payload.title, speaker.name)
  })
  socket.on('ask', function(question) {
    currentQuestion = question
    io.sockets.emit('ask', currentQuestion)
    console.log('Questioned Asked: %s', question.q)
  })

  socket.emit('welcome', {
    title: title,
    audience: audience,
    speaker: speaker.name,
    questions: questions,
    currentQuestion: currentQuestion
  })

  connections.push(socket)
  console.log('Connected: %s sockets connected', connections.length)
})
console.log("App Server is running on port: 3000")
