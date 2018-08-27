var socket = io()

socket.on('connect', function() {
    console.log('Connected to server!')
})

socket.on('disconnect', function() {
    console.log('Disconnected from server!')
})

socket.on('newMessage', function(message) {
    $('#room').append(`<p>${message.from}: ${message.text}</p>`)
})

$('#message-form').on('submit', function(e) {
    e.preventDefault()

    socket.emit('createMessage', {
        from: 'User',
        text: $('#message').val()
    }, function(message) {
        console.log(message)
    })
})
