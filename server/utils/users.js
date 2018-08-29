var _ = require('lodash')

class Users {
    constructor() {
        this.users = []
    }

    addUser(id, name, room) {
        let user = {id, name, room}
        this.users.push(user)
        return user
    }

    removeUser(id) {
        return _.remove(this.users, (user) => user.id === id)[0]
    }

    getUser(id) {
        return _.find(this.users, ['id', id])
    }

    getUserList(room) {
        return this.users
            .filter((user) => user.room === room)
            .map((user) => user.name)
    }
}

module.exports = {Users}
