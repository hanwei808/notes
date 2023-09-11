const mongoose = require('mongoose');
const { dbUri } = require('../config/config.default')

// 连接 MongoDB 数据库
mongoose.connect(dbUri, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const db = mongoose.connection

// 当连接失败的时候
db.on('error', () => {
    console.log('MongoDB 数据库连接失败')
})

// 当连接成功的时候
db.once('open', function () {
    console.log('MongoDB 数据库连接成功')
})

// 组织导出模型类
module.exports = {
    User: mongoose.model('user', require('./user')),
    Article: mongoose.model('article', require('./article'))
}
