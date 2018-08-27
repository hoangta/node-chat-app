let {makeMessage, makeLocationMessage} = require('./message')

describe('makeMessage', () => {
    it('should make a proper message object', () => {
        let message = makeMessage('me', 'hi from other side..')
        expect(message.from).toBe('me')
        expect(message.text).toBe('hi from other side..')
        expect(typeof message.createAt).toBe('number')
    });
})

describe('makeLocationMessage', () => {
    it('should make a proper location message object', () => {
        let message = makeLocationMessage('me', 1, 2)
        expect(message.from).toBe('me')
        expect(message.url).toBe('https://www.google.com/maps?q=1,2')
        expect(typeof message.createAt).toBe('number')
    });
})
