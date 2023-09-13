const express = require('express')
const { ApolloServer, gql } = require('apollo-server-express')
const { User } = require('./models')
const Users = require('./data-sources/user')

// 定义 Schema
const typeDefs = gql`
    type User {
        _id: ID!,
        name: String!,
        age: Int
    }
    type Query {
        users: [User!]
        user(id: ID!): User
    }
`
// 定义 resolver
const resolvers = {
    // 所有的 Query 都走这里
    Query: {
        async users(parent, args, { dataSources }) {
            const users = await dataSources.users.getUsers()
            return users
        },
        async user(parent, { id }, { dataSources }) {
            const user = await dataSources.users.getUser(id)
            return user
        }
        // users: async () => {
        //     return await User.find()
        // },
        // user: async (parent, { id }) => {
        //     const user = await User.findById(id)
        //     return user
        // }
    }
}

const app = express()

async function start() {
    // 创建 Apollo Server
    const server = new ApolloServer({
        typeDefs,
        resolvers,
        // 任何 GraphQL 请求都会经过这里
        // 该函数接收一个参数：Request 请求对象
        context(req) {
            return {
                // 该函数返回的对象会被作为 context 参数传递给所有的 resolvers
                foo: 'bar'
            }
        },
        dataSources() {
            return {
                users: new Users(User)
            }
        }
    })

    await server.start()

    // 将 Apollo-server 和 Express 集合到一起
    server.applyMiddleware({ app })

    app.use((req, res) => {
        res.status(200)
        res.send('Hello!')
        res.end()
    })

    app.listen({ port: 4000 }, () => {
        console.log('Apollo Server on http://localhost:4000/graphql')
    })
}

start()
