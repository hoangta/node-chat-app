let makeMessage = (from, text) => {
    return {
        from,
        text,
        createAt: new Date().getTime()
    }
}

let makeLocationMessage = (from, lat, lng) => {
    return {
        from,
        url: `https://www.google.com/maps?q=${lat},${lng}`,
        createAt: new Date().getTime()
    }
}

module.exports = {makeMessage, makeLocationMessage}
