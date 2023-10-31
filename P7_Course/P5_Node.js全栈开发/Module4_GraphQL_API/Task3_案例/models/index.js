const mongoose = require('mongoose')
const { dbUri } = require('../config/config.default')
mongoose.connect(dbUri, { useNewUrlParser: true, useUnifiedTopology: true })

const db = mongoose.connection
db.on('error', console.error.bind(console, 'connection error:'))
db.once('open', () => {
    console.log('db connected')
})

module.exports = {
    User: require('./user'),
    Article: require('./article')
}