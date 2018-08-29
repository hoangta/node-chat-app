const path = require('path')
const http = require('http')
const express = require('express')
const socketIO = require('socket.io')

const publicPath = path.join(__dirname, '/../public')
const port = process.env.PORT || 3000
const {makeMessage, makeLocationMessage} = require('./utils/message')
const {isRealString} = require('./utils/validation')
const {Users} = require('./utils/users')

var app = express()
var server = http.createServer(app)
var io = socketIO(server)
var users = new Users()

app.use(express.static(publicPath))

io.on('connection', (socket) => {
    console.log('New user connected!')

    socket.on('join', (params, callback) => {
        if (!isRealString(params.name) || !isRealString(params.room)) {
            return callback('Name and room are required!')
        }

        socket.join(params.room)
        //socket.leave('params.room')

        users.removeUser(socket.id)
        users.addUser(socket.id, params.name, params.room)

        io.to(params.room).emit('updateUserList', users.getUserList(params.room))

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

    socket.on('disconnect', () => {
        let user = users.removeUser(socket.id)
        if (user) {
            io.to(user.room).emit('updateUserList', users.getUserList(user.room))
            io.to(user.room).emit('newMessage', makeMessage('Admin', `${user.name} has left.`))
        }
    })
})

server.listen(port, () => {
    console.log(`Started on port ${port}`)
})
