const dbModel = require('../models')
const Users = require('./user')
const Article = require('./article')

module.exports = () => {
    return {
        Users: new Users(dbModel.User),
        Article: new Article(dbModel.Article)
    }
}