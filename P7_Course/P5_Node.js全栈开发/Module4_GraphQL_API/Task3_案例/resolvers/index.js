const { UserInputError } = require('apollo-server-express')
const jwt = require('../util/jwt')
const md5 = require('../util/md5')
const { jwtSecret } = require('../config/config.default')

// 定义 resolver
const resolvers = {
    // 所有的 Query 都走这里
    Query: {
        foo(parent, args, context, info) {
            console.log('foo', context.user)
            return 'hello'
        },
        currentUser(parent, args, context, info) {
            // 校验打钱登录状态
            // 获取当前登录用户的信息
            // 返回用户信息
            console.log(context.token);
            return context.user
        }
    },

    Mutation: {
        async createUser(parent, { user }, { dataSources }) {
            const users = dataSources.Users
            // 判断邮箱是否存在
            const user1 = await users.findByEmail(user.email)
            if (user1) {
                throw new UserInputError('邮箱已存在')
            }
            // 判断用户是否存在
            const user2 = await users.findByUsername(user.username)
            if (user2) {
                throw new UserInputError('用户已存在')
            }
            // 创建用户
            const userData = await users.saveUser(user)
            // 生成 token 发送给客户端
            const token = await jwt.sign({
                userId: userData._id
            }, jwtSecret, {
                expiresIn: 60 * 60 * 24
            })
            return {
                user: {
                    ...userData.toObject(),
                    token
                }
            }
        },
        async login(parent, { user }, { dataSources }) {
            // 用户是否存在
            const userData = await dataSources.Users.findByEmail(user.email)
            if (!userData) {
                throw new UserInputError('邮箱不存在')
            }
            if (md5(user.password) !== userData.password) {
                throw new UserInputError('密码错误')
            }
            const token = await jwt.sign({
                userId: userData._id
            }, jwtSecret, {
                expiresIn: 60 * 60 * 24
            })
            return {
                user: {
                    ...userData.toObject(),
                    token
                }
            }
        }
    }
}

module.exports = resolvers