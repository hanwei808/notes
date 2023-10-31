const { MongoDataSource } = require('apollo-datasource-mongodb')

class Users extends MongoDataSource {
    getUser(userId) {
        return this.findOneById(userId)
    }
    getUsers() {
        return this.model.find()
    }
    findByEmail(email) {
        return this.model.findOne({
            email
        })
    }
    findByUsername(username) {
        return this.model.findOne({
            username
        })
    }
    saveUser(args) {
        const user = new this.model(args)
        return user.save()
    }
    findById(userId) {
        return this.findById(userId)
    }
}

module.exports = Users