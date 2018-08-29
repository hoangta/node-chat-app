let {Users} = require('./users')

describe('Users', () => {
    let users

    beforeEach(() => {
        users = new Users()
        users.users = [{
            id: 1,
            name: 'hoang',
            room: 'emptyRoom'
        }, {
            id: 2,
            name: 'phong',
            room: 'fullRoom'
        }, {
            id: 3,
            name: 'alex',
            room: 'emptyRoom'
        }]
    })

    it('should add new user', () => {
        let users = new Users()
        let user = {
            id: 1,
            name: 'hoang',
            room: 'darkone'
        }
        let res = users.addUser(user.id, user.name, user.room)
        expect(users.users).toEqual([user])
    })

    it('should remove a user', () => {
        let user = users.removeUser(1)
        expect(user).toBeTruthy()
        expect(users.users.length).toBe(2)
    })

    it('should NOT remove a user', () => {
        let user = users.removeUser(11)
        expect(user).toBeFalsy()
        expect(users.users.length).toBe(3)
    })

    it('should find a user', () => {
        let user = users.getUser(1)
        expect(user).toBeTruthy()
    })

    it('should NOT find a user', () => {
        let user = users.getUser(11)
        expect(user).toBeFalsy()
    })

    it('should return names for empty room', () => {
        let userList = users.getUserList('emptyRoom')
        expect(userList).toEqual(['hoang', 'alex'])
    })

    it('should return names for empty room', () => {
        let userList = users.getUserList('fullRoom')
        expect(userList).toEqual(['phong'])
    })
})
