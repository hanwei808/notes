const { Article } = require('../model')
const userSchema = require('../model/user')
const mongoose = require('mongoose')
const User = mongoose.model('User', userSchema)

// 获取文章列表
exports.getArticles = async (req, res, next) => {
    try {
        const { limit = 20, offset = 0, tag, author } = req.query
        const filter = {}
        if (tag) {
            filter.tagList = tag
        }
        if (author) {
            const user = await User.findOne({ username: author })
            filter.author = user ? user._id : null
        }
        // 处理请求
        const articles = await Article.find(filter)
            .populate('author')
            .skip(Number.parseInt(offset))
            .limit(Number.parseInt(limit))
            .sort({
                createdAt: -1
            })
        const articlesCount = await Article.find(filter).countDocuments()
        res.status(200).json({
            articles,
            articlesCount
        })
    } catch (err) {
        next(err)
    }
}
// 获取用户关注的作者列表
exports.getFeedArticles = async (req, res, next) => {
    try {
        // 处理请求
        res.send('get /articles/feed')
    } catch (err) {
        next(err)
    }
}
// 获取文章
exports.getArticle = async (req, res, next) => {
    try {
        // 处理请求
        const article = Article.findById(req.params.articleId).populate('author')
        if (!article) {
            return res.status(404).end()
        }
        res.status(200).json({
            article
        })
    } catch (err) {
        next(err)
    }
}
// 创建文章
exports.createArticle = async (req, res, next) => {
    try {
        // 处理请求
        const article = new Article(req.body.article)
        article.author = req.user._id
        // article.populate('author').execPopulate()
        await article.save()
        res.status(201).json({
            article
        })
    } catch (err) {
        next(err)
    }
}
// 更新文章
exports.updateArticle = async (req, res, next) => {
    try {
        // 处理请求
        const article = req.article
        const bodyArticle = req.body.article
        article.title = bodyArticle.title || article.title
        article.descript = bodyArticle.descript || article.descript
        article.body = bodyArticle.body || article.body
        await article.save()
        res.status(200).json({
            article
        })
    } catch (err) {
        next(err)
    }
}
// 删除文章
exports.deleteArticle = async (req, res, next) => {
    try {
        // 处理请求
        const article = req.article
        await article.remove()
        res.status(204).end()
    } catch (err) {
        next(err)
    }
}
// 添加文章评论
exports.createArticleComment = async (req, res, next) => {
    try {
        // 处理请求
        res.send('delete /articles/:slug')
    } catch (err) {
        next(err)
    }
}
// 获取文章评论
exports.getArticleComments = async (req, res, next) => {
    try {
        // 处理请求
        res.send('delete /articles/:slug')
    } catch (err) {
        next(err)
    }
}
// 删除文章评论
exports.deleteArticleComment = async (req, res, next) => {
    try {
        // 处理请求
    } catch (err) {
        next(err)
    }
}

