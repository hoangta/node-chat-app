let {makeMessage} = require('./message')

describe('makeMessage', () => {
    it('should make a proper message object', () => {
        let message = makeMessage('me', 'hi from other side..')
        expect(message.from).toBe('me')
        expect(message.text).toBe('hi from other side..')
        expect(typeof message.createAt).toBe('number')
    });
})
