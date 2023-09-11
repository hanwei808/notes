const express = require('express')
const { MongoClient, ObjectId } = require('mongodb')

const connectUri = 'mongodb://127.0.0.1:27017'

const dbClient = new MongoClient(connectUri, { useUnifiedTopology: true })

const app = express()

// 配置解析请求体数据
// 它会把解析到的请求体数据放到req.body中
app.use(express.json())

app.get('/', (req, res) => {
    res.send('Hello World')
})

// 配置路由
// 添加文章
app.post('/articles', async (req, res, next) => {
    try {
        console.log('req.body', req.body)
    // 获取客户端表单数据
    const { article } = req.body
    // 数据验证
    if (!article || !article.title || !article.description || !article.body) {
        return res.status(422).json({
            error: '请求参数不符合规则要求'
        })
    }
    // 把验证通过的数据插入数据库中
    await dbClient.connect()
    const collection = dbClient.db('test').collection('articles')
    const ret = await collection.insertOne(article)
    article.id = ret.insertedId
    // 发送响应
    res.status(201).json({
        article
    })
    } catch (err) {
        next(err)
    }
})
// 分页查询文章列表
app.get('/articles', async (req, res, next) => {
    try {
        let { _page = 1, _size = 10 } = req.query
        _page = Number.parseInt(_page)
        _size = Number.parseInt(_size)
        await dbClient.connect()
        const collection = dbClient.db('test').collection('articles')
        const ret = await collection.find().skip((_page - 1) * _size).limit(_size)
        const articles = await ret.toArray()
        const articleCount = await collection.countDocuments()
        res.status(200).json({
            articles,
            articleCount
        })
    } catch (err) {
        next(err)
    }
})
// 获取文章详情
app.get('/articles/:id', (req, res, next) => {
    try {
        await dbClient.connect()
        const collection = dbClient.db('test').collection('articles')
        const article = aawit collection.findOne({
            _id: ObjectId(req.params.id)
        })
        res.status(200).json({
            article
        })
    } catch (err) {
        next(err)
    }
})
// 修改文章
app.patch('/articles/:id', (req, res, next) => {
    try {
        await dbClient.connect()
        const collection = dbClient.db('test').collection('articles')
        await collection.updateOne({
            _id: ObjectId(req.params.id)
        }, {
            $set: req.body.article
        })
        const article = await collection.findOne({
            _id: ObjectId(req.params.id)
        })
        res.status(201).json({
            article
        })
    } catch (err) {
        next(err)
    }
})
app.delete('/articles/:id', (req, res) => {
    res.send('delete /articles/:id')
})
// 处理异常的中间件
// 它之前的所有路由中调用next(err)都会进入这里
app.use((err, req, res, next) => {
    res.status(500).json({
        error: err.massage
    })
})

app.listen(3000, () => {
    console.log('Server is running on port 3000')
})

// 启动服务 nodemon ./app.js