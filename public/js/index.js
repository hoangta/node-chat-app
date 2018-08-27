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

socket.on('newLocationMessage', function(message) {
    var a = $('<a target="_blank">My location</a>')
    a.attr('href', message.url)
    $('#room').append(a)
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

$('#send-location').on('click', function() {
    if (!navigator.geolocation) {
        return alert('Geolocation not supported by your browser.')
    }

    navigator.geolocation.getCurrentPosition(function(position) {
        socket.emit('createLocationMessage', {
            lat: position.coords.latitude,
            lng: position.coords.longitude
        })
    }, function() {
        alert('Unable to fetch location.')
    })
})
