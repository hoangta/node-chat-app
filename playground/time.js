const moment = require('moment')

let date = moment()
// date.subtract(1, 'hours')
console.log(date.format('MMM Do, YYYY h:mm:ss a'))
