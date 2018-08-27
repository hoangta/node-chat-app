const moment = require('moment')

let makeMessage = (from, text) => {
    return {
        from,
        text,
        createAt: moment().valueOf()
    }
}

let makeLocationMessage = (from, lat, lng) => {
    return {
        from,
        url: `https://www.google.com/maps?q=${lat},${lng}`,
        createAt: moment().valueOf()
    }
}

module.exports = {makeMessage, makeLocationMessage}
