const jwt = require('jsonwebtoken')

let whileList = ['/login']

function valid(ctx){
  return new Promise((resolve, reject) => {
    const { cookie } = ctx.header
    let token = cookie ? cookie.split('; ') : []
    token = token.filter(v => {
      return v.split('=')[0] === ctx.$config.tokenName
    })
    token = token.join('').split('=')[1]
    jwt.verify(token, ctx.$config.secret, (err, decoded) => {
      if (err) {
        resolve(false)
      }
      const { exp, id } = decoded
      if (exp*1000 > new Date().getTime()) {
        ctx.$activeUserId = id
        resolve(true)
      } else {
        resolve(false)
      }
    })
  })
}


module.exports = async (ctx, next) => {
  if (whileList.includes(ctx.url)) {
    await next()
  } else {
    const verifyToken = await valid(ctx)
    if(!verifyToken) {
      ctx.cookies.set(
        ctx.$config.tokenName, null, {
          domain: 'localhost',
          maxAge: 0,
          httpOnly: true,
          overwrite: true
        } 
      )
      ctx.status = 401
      ctx.body = {
        code: 401,
        data: [],
        msg: '无效的登录方式'
      }
    } else {
      await next()
    }
  }
}