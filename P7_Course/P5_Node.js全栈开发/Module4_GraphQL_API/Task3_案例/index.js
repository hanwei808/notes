const express = require('express')
const { ApolloServer, } = require('apollo-server-express')
const schema = require('./schema')
const dataSources = require('./data-sources')
const jwt = require('./util/jwt')
const { jwtSecret } = require('./config/config.default')

const app = express()

async function start() {
    // 创建 Apollo Server
    const server = new ApolloServer({
        schema,
        dataSources,
        // 所有的GraphQL查询都会经过这里
        context({ req }) {
            // 获取请求头中的token
            const token = req.headers.authorization
            // 解析token
            const user = jwt.verify(token, jwtSecret)
            // 将user挂载到context上
            return {
                user,
                token
            }
        }
    })

    await server.start()

    // 将 Apollo-server 和 Express 集合到一起
    server.applyMiddleware({ app })

    app.listen({ port: 4000 }, () => {
        console.log('Apollo Server on http://localhost:4000/graphql')
    })
}

start()
