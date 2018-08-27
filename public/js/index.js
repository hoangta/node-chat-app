var socket = io()

socket.on('connect', function() {
    console.log('Connected to server!')
})

socket.on('disconnect', function() {
    console.log('Disconnected from server!')
})

socket.on('newMessage', function(message) {
    var time = moment(message.createAt).format('h:mm a')
    $('#room').append(`<p>${message.from} ${time}: ${message.text}</p>`)
})

socket.on('newLocationMessage', function(message) {
    var time = moment(message.createAt).format('h:mm a')
    var p = $(`<p>${message.from} ${time}: </p>`)
    var a = $('<a target="_blank">My location</a>')
    a.attr('href', message.url)
    p.append(a)
    $('#room').append(p)
})

$('#message-form').on('submit', function(e) {
    e.preventDefault()

    var messageTextBox = $('#message')

    socket.emit('createMessage', {
        from: 'User',
        text: messageTextBox.val()
    }, function(message) {
        messageTextBox.val('')
    })
})

var locationButton = $('#send-location')
locationButton.on('click', function() {
    if (!navigator.geolocation) {
        return alert('Geolocation not supported by your browser.')
    }

    locationButton.attr('disabled', 'disabled').text('Sending location...')

    navigator.geolocation.getCurrentPosition(function(position) {
        locationButton.removeAttr('disabled').text('Send location')
        socket.emit('createLocationMessage', {
            lat: position.coords.latitude,
            lng: position.coords.longitude
        })
    }, function() {
        locationButton.removeAttr('disabled').text('Send location')
        alert('Unable to fetch location.')
    })
})
