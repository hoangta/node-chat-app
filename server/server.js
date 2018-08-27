const path = require('path')
const http = require('http')
const express = require('express')
const socketIO = require('socket.io')

const publicPath = path.join(__dirname, '/../public')
const port = process.env.PORT || 3000
const {makeMessage} = require('./utils/message')

var app = express()
var server = http.createServer(app)
var io = socketIO(server)

app.use(express.static(publicPath))

io.on('connection', (socket) => {
    console.log('New user connected!')

    socket.emit('newMessage', makeMessage('Admin', 'Welcome to the chat app!'))
    socket.broadcast.emit('newMessage', makeMessage('Admin', 'Someone joined the room!'))
    socket.on('createMessage', (message) => {
        console.log(`${message.from} said ${message.text}`)
        // io.emit('newMessage', message)
        socket.broadcast.emit('newMessage', makeMessage(message.from, message.text))
    })

    socket.on('disconnect', (socket) => {
        console.log('User was disconnected')
    })
})

server.listen(port, () => {
    console.log(`Started on port ${port}`)
})
