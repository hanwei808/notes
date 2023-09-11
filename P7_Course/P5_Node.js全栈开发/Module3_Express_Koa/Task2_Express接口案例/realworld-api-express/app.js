const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const router = require('./router')
const errorHandler = require('./middleware/error-handler')
require('./model')

const app = express()
// 配置日志输出
app.use(morgan('dev'))
// 解析请求体
app.use(express.json())
// 配置跨域
app.use(cors())

const PORT = process.env.PORT || 3000

// 挂载路由
app.use('/api', router)

// 错误处理中间件
app.use(errorHandler())

app.listen(PORT, () => {
    console.log(`Server is running at port ${PORT}`)
})