var socket = io()

socket.on('connect', function() {
    console.log('Connected to server!')
})

socket.on('disconnect', function() {
    console.log('Disconnected from server!')
})

socket.on('newMessage', function(message) {
    var time = moment(message.createAt).format('h:mm a')
    var template = $('#message-template').html()
    var html = Mustache.render(template, {
        text: message.text,
        from: message.from,
        createAt: time
    })
    $('#room').append(html)
})

socket.on('newLocationMessage', function(message) {
    var time = moment(message.createAt).format('h:mm a')
    var template = $('#location-message-template').html()
    var html = Mustache.render(template, {
        url: message.url,
        from: message.from,
        createAt: time
    })
    $('#room').append(html)
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
