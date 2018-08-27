var socket = io()

socket.on('connect', function() {
    console.log('Connected to server!')
})

socket.on('disconnect', function() {
    console.log('Disconnected from server!')
})

socket.on('newMessage', function(message) {
    var p = document.createElement('p')
    var node = document.createTextNode(`${message.from}: ${message.text}`)
    p.appendChild(node)
    document.getElementById('content').appendChild(p)
})
