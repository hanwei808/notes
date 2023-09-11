const express = require('express')

const router = express.Router()

// 用户登录
router.post('/users/login', (req, res, next) => {
    try {
        // 处理请求
        res.send('post /users/login')
    } catch (err) {
        next(err)
    }
})

module.exports = router