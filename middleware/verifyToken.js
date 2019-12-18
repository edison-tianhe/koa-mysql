const jwt = require('jsonwebtoken')

let whileList = ['/login']

function valid(ctx){
  const res = new Promise((resolve, reject) => {
    const { cookie } = ctx.header
    let token = cookie ? cookie.split('; ') : []
    token = token.filter(v => {
      return v.split('=')[0] === 'Edison_cookies'
    })
    token = token.join('').split('=')[1]
    if (!token) {
      resolve(false)
    }
    jwt.verify(token, ctx.$config.secret, (err, decoded) => {
      if (err) {
        resolve(false)
      }
      const { exp } = decoded
      if (exp*1000 > new Date().getTime()) {
        resolve(true)
      } else {
        resolve(false)
      }
    })
  })
  return res            
}


module.exports = async (ctx, next) => {
  if (whileList.includes(ctx.url)) {
    await next()
  } else {
    const verifyToken = await valid(ctx)
    if(!verifyToken) {
      ctx.status = 401
      ctx.body = {
        code: 401,
        data: [],
        message: '无效的登录方式'
      }
    } else {
      await next()
    }
  }
}