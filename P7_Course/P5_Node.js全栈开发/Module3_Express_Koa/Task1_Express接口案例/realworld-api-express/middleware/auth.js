const { verify } = require('../util/jwt')
const { jwtSecret } = require('../config/config.default')
const { User } = require('../model')

module.exports = async (req, res, next) => {
    // 从请求头获取token数据
    let token = req.headers['authorization']
    if (!token) return res.status(401).end()
    // 验证token是否有效
    try {
        const decodeToken = await verify(token, jwtSecret)
        req.user = await User.findById(decodeToken.userId)
        next()
    } catch (err) {
        return res.status(401).end()
    }
}