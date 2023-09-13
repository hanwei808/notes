const { buildSchema } = require('graphql')
const express = require('express')
const { graphqlHTTP } = require('express-graphql')
const cors = require('cors')
const { v4: uuidv4 } = require('uuid')

const app = express()
app.use(cors())

const articles = [
    { id: 1, title: 'article1', author: 'author1' },
    { id: 2, title: 'article2', author: 'author2' },
    { id: 3, title: 'article3', author: 'author3' }
]

// 使用 GraphQL Schema Language 创建一个 schema
const schema = buildSchema(`
    type Article {
        id: ID!
        title: String!
        body: String!
        tagList: [String!]
    }

    # 查询入口点
    type Query {
        hello: String,
        articles: [Article]
        article(id: ID!): Article
    }

    # 参考对象必须使用 Input 定义
    input CreateArticleInput {
        title: String!
        body: String!
        tagList: [String!]
    }

    input UpdateArticleInput{
        title: String!
        body: String!
    }

    type DeletionStatus {
        success: Boolean!
    }

    # 修改入口点
    type Mutation {
        createArticle(input: CreateArticleInput): Article
        updateArticle(id: ID!, input: UpdateArticleInput): Article
        deleteArticle(id: ID!): DeletionStatus
    }
`)

// 定义 schema 的 resolver
const root = {
    hello: () => {
        return 'Hello world!'
    },
    articles: () => {
        return articles
    },
    article(arg) {
        return articles.find(article => article.id === Number(arg.id))
    },
    createArticle({ input }) {
        const article = {
            id: uuidv4(),
            ...input
        }
        articles.push(article)
        return article
    },
    UpdateArticleInput({ id, input }) {
        const article = articles.find(article => article.id === Number(id))
        if (!article) {
            throw new Error(`Article ${id} not found`)
        }
        Object.assign(article, input)
        return article
    },
    deleteArticle({ id }) {
        const articleIndex = articles.findIndex(article => article.id === Number(id))
        if (articleIndex === -1) {
            throw new Error(`Article ${id} not found`)
        }
        articles.splice(articleIndex, 1)
        return {
            success: true
        }
    }
}

// 挂载 GraphQL 中间件
app.use('/graphql', graphqlHTTP({
    schema,
    rootValue: root,
    graphql: true
}))

// 启动 web 服务
app.listen(4000, () => {
    console.log('Running a GraphQL API server at http://localhost:4000/graphql')
})
