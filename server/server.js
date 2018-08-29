const path = require('path')
const http = require('http')
const express = require('express')
const socketIO = require('socket.io')

const publicPath = path.join(__dirname, '/../public')
const port = process.env.PORT || 3000
const {makeMessage, makeLocationMessage} = require('./utils/message')
const {isRealString} = require('./utils/validation')

var app = express()
var server = http.createServer(app)
var io = socketIO(server)

app.use(express.static(publicPath))

io.on('connection', (socket) => {
    console.log('New user connected!')

    socket.on('join', (params, callback) => {
        if (!isRealString(params.name) || !isRealString(params.room)) {
            callback('Name and room are required!')
        }

        socket.join(params.room)
        //socket.leave('params.room')

        socket.emit('newMessage', makeMessage('Admin', 'Welcome to the chat app!'))
        socket.broadcast.to(params.room).emit('newMessage', makeMessage('Admin', `${params.name} has joined.`))
        callback()
    })

    socket.on('createMessage', (message, callback) => {
        console.log(`${message.from} said ${message.text}`)
        io.emit('newMessage', makeMessage(message.from, message.text))
        callback()
    })

    socket.on('createLocationMessage', (coords) => {
        console.log(coords)
        io.emit('newLocationMessage', makeLocationMessage('Admin', coords.lat, coords.lng))
    })

    socket.on('disconnect', (socket) => {
        console.log('User was disconnected')
    })
})

server.listen(port, () => {
    console.log(`Started on port ${port}`)
})
