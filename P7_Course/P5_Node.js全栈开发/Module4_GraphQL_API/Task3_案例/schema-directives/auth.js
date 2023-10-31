const { getDirective, MapperKind, mapSchema, AuthenticationError } = require('graphql-tools')
const { defaultFieldResolver, GraphQLSchema } = require('graphql');
const jwt = require('../util/jwt');

const AuthDirective = (directiveName, schema) =>
    mapSchema(schema, {
        [MapperKind.TYPE]: type => {
            const authDirective = getDirective(schema, type, directiveName)?.[0]
            return undefined
        },
        [MapperKind.OBJECT_FIELD]: (fieldConfig, _fieldName, typeName) => {
            const authDirective =
                getDirective(schema, fieldConfig, directiveName)?.[0]
            if (authDirective) {
                const { requires } = authDirective
                if (requires) {
                    const { resolve = defaultFieldResolver } = fieldConfig
                    fieldConfig.resolve = async function (source, args, context, info) {
                        const { token, dataSources } = context
                        console.log('token', token);
                        if (!token) {
                            throw new AuthenticationError('未授权')
                        }
                        try {
                            const decodedData = await jwt.verify(token, jwtSecret)
                            const user = await dataSources.users.findById(decodedData.userId)
                            console.log('user', user)
                            context.user = user
                        } catch (error) {
                            throw new AuthenticationError('未授权')
                        }

                        const result = await resolve(parent, args, context, info)
                        return result
                    };
                    return fieldConfig;
                }
            }
        }
    })

module.exports = AuthDirective