const { body, param } = require('express-validator')
const validate = require('../middleware/validate')
const mongoose = require('mongoose')
const { Article } = require('../model')

exports.createArticle = validate([
    body('article.title').notEmpty().withMessage('文章标题不能为空'),
    body('article.descript').notEmpty().withMessage('文章摘要不能为空'),
    body('article.body').notEmpty().withMessage('文章内容不能为空')
])

exports.getArticle = validate([
    validate.isValidObjectId(['params'], 'articleId')
])

exports.updateArticle = [
    validate([
        validate.isValidObjectId(['params'], 'articleId')
    ]),
    // 校验文章是否存在
    async (req, res, next) => {
        const article = await Article.findById(req.params.articleId)
        req.article = article
        if (!article) {
            return res.status(404).end()
        }
        next()
    },
    // 修改文章作者是否是当前登录用户
    async (req, res, next) => {
        if (req.article.author.toString() !== req.user._id.toString()) {
            return res.status(403).end()
        }
        next()
    }
]

exports.deleteArticle = exports.updateArticle
