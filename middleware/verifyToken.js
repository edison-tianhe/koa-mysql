const jwt = require('jsonwebtoken')
const config = require('../config')

let whileList = ['/login']

module.exports = () => {
  return async (ctx, next) => {
    if (whileList.includes(ctx.url)) {
      await next()
    } else {
      try {
        const dataString = ctx.header.cookie
        const dataArr = dataString ? dataString.split('=') : []
        const token = dataArr[1]
        const Payload = await jwt.verify(token, config.secret)
        const { exp } = Payload
        if (exp*1000 > new Date().getTime()) {
          await next()
        } else {
          ctx.status = 401
          ctx.body = {
            code: 401,
            data: [],
            message: '登录超时,请重新登录'
          }
        }
      }
      catch (e) {
        ctx.status = 401
        ctx.body = {
          code: 401,
          data: [],
          message: '无效的登录方式'
        }
      }
    }
  }
}