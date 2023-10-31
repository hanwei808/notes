const { makeExecutableSchema } = require('graphql-tools')
const typeDefs = require('./type-defs')
const resolvers = require('./resolvers')
const schemaDirectives = require('./schema-directives')

const schema = makeExecutableSchema({
    typeDefs,
    resolvers,
    schemaDirectives
})
schema = schemaDirectives.auth()

module.exports = schema