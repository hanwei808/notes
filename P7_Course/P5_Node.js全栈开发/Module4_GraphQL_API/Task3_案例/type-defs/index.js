const { gql } = require('apollo-server-express');


// 定义 Schema
const typeDefs = gql`
    # 定义指令
    directive @auth on FIELD_DEFINITION

    type User {
        email: String!
        username: String!
        bio: String
        image: String
        token: String
    }
    type UserPayload {
        user: User
    }
    type Query {
        foo: String @auth
        currentUser: User @auth
    }
    input LoginInput {
        email: String!
        password: String!
    }
    input CreateUserInput {
        username: String!
        email: String!
        password: String!
    }
    type Mutation {
        login(user: LoginInput): UserPayload
        createUser(user: CreateUserInput): UserPayload
    }
`

module.exports = typeDefs
