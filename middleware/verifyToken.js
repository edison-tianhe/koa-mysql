const jwt = require('jsonwebtoken')

let whileList = ['/login']

module.exports = async (ctx, next) => {
  if (whileList.includes(ctx.url)) {
    await next()
  } else {
    try {
      const { cookie } = ctx.header
      let dataArr = cookie ? cookie.split('; ') : []
      dataArr = dataArr.filter(v => {
        return v.split('=')[0] === 'Edison_cookies'
      })
      const token = dataArr.join('').split('=')[1]
      const Payload = await jwt.verify(token, ctx.$config.secret)
      const { exp } = Payload
      if (exp*1000 > new Date().getTime()) {
        await next().catch((err) => {
          ctx.status = err.statusCode || err.status || 500
          ctx.body = err
        })
      } else {
        ctx.status = 401
        ctx.body = {
          code: 401,
          data: [],
          message: '登录超时,请重新登录'
        }
      }
    } catch (e) {
      ctx.status = 401
      ctx.body = {
        code: 401,
        data: [],
        message: '无效的登录方式'
      }
    }
  }
}