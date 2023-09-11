const express = require('express')

const router = express.Router()

// 获取用户资料
router.post('/:username', (req, res, next) => {
    try {
        // 处理请求
        res.send('post profiles/:username')
    } catch (err) {
        next(err)
    }
})

// 关注用户
router.post('/:username/follow', (req, res, next) => {
    try {
        // 处理请求
        res.send('post profiles/:username/follow')
    } catch (err) {
        next(err)
    }
})

// 取消关注用户
router.delete('/:username/follow', (req, res, next) => {
    try {
        // 处理请求
        res.send('delete profiles/:username/follow')
    } catch (err) {
        next(err)
    }
})

module.exports = router