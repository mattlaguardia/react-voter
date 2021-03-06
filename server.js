var express = require('express')
var app = express()
var _ = require('underscore')

var connections = []
var title = 'Untitled Presentation'
var audience = []
var speaker = {}
var questions = require("./questions")
var currentQuestion = false
var socketIO = require('socket.io')

// static is middleware //
app.use(express.static('./public'))
// static middleware for bootstrap //
app.use(express.static('./node_modules/bootstrap/dist'))

const server = require('http').createServer(app)
  .listen(process.env.PORT || 3000)

// app.get('*', function(req, res, next) {
//   res.header('Access-Control-Allow-Origin', '*');
//   res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
//   res.header('Access-Control-Allow-Headers', 'accept, content-type, x-parse-application-id, x-parse-rest-api-key, x-parse-session-token');
//   if ('OPTIONS' == req.method) {
//     res.send(200);
//   }
  // if(req.headers['x-forwarded-proto'] != 'https' && process.env.NODE_ENV === 'production')
  //   res.redirect('https://'+req.hostname+req.url)
  // else
//     next() /* Continue to other routes if we're not redirecting */
// })

///////////////
// Socket io //
///////////////
const io = socketIO(server)
// io.set('transports', ['xhr-polling']);
// io.set('polling duration', 10);

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

var allowCrossDomain = function(req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*')
    res.setHeader('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS')
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With')
    res.setHeader('Access-Control-Allow-Credentials', true)
    if(req.headers['x-forwarded-proto'] != 'https' && process.env.NODE_ENV === 'production')
      res.redirect('https://'+req.hostname+req.url)
    }
    // intercept OPTIONS method
    if ('OPTIONS' == req.method) {
      res.send(200);
    }
    else {
      next()
    }
}

app.use(allowCrossDomain)

console.log("App Server is running on port: 3000")
