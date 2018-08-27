const path = require('path')
const http = require('http')
const express = require('express')
const socketIO = require('socket.io')

const publicPath = path.join(__dirname, '/../public')
const port = process.env.PORT || 3000

var app = express()
var server = http.createServer(app)
var io = socketIO(server)

app.use(express.static(publicPath))

io.on('connection', (socket) => {
    console.log('New user connected!')

    socket.emit('newMessage', {
        from: 'Admin',
        text: 'Welcome to the chat app!',
        createAt: new Date().getTime()
    })
    socket.broadcast.emit('newMessage', {
        from: 'Admin',
        text: 'Someone joined the room!',
        createAt: new Date().getTime()
    })
    socket.on('createMessage', (message) => {
        console.log(`${message.from} said ${message.text}`)
        message.createAt = new Date().getTime()
        // io.emit('newMessage', message)
        socket.broadcast.emit('newMessage', message)
    })

    socket.on('disconnect', (socket) => {
        console.log('User was disconnected')
    })
})

server.listen(port, () => {
    console.log(`Started on port ${port}`)
})
