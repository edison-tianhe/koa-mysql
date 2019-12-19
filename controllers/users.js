const jwt = require('jsonwebtoken')
const { validatorUserLogin, validatorUserSignin } = require('../validator/users')

const fn_ = async (ctx, next) => {
  ctx.body = `hello node.js+koa+mysql`
}

const fn_signin = async (ctx, next) => {
  const { errors, isValid } = validatorUserSignin(ctx.request.body)
  const { username, password, email, avator, sex, phone } = ctx.request.body
  if (!isValid) {
    return ctx.body = ctx.$mysql.backInfo(-1, errors, '注册失败')
  }
  await ctx.$mysql.query(` SELECT * FROM users WHERE (\`username\`='${username}')`)
  .then(res => {
    if (res.length > 0) {
      ctx.body = ctx.$mysql.backInfo(-1, errors, '该用户名已经被注册')
      return Promise.reject('end')
    }
  })
  .then(async res => {
    await ctx.$mysql.query(`INSERT INTO users(username, \`password\`, email, avator, sex, phone)
    VALUES('${username}', '${password}', '${email}', '${avator}', ${sex}, ${phone})`)
    .then(res => {
      ctx.body = ctx.$mysql.backInfo(0, [], '注册成功')
    })
  })
  .catch(err => {})
}

const fn_login = async (ctx, next) => {
  const { errors, isValid } = validatorUserLogin(ctx.request.body)
  const { username, password } = ctx.request.body
  if (!isValid) {
    return ctx.body = ctx.$mysql.backInfo(-1, errors, '登陆失败')
  }
  await ctx.$mysql.query(` SELECT * FROM users WHERE (\`username\`='${username}')`)
  .then(res => {
    if (res.length === 1) {
      if (res[0].password === password) {
        const token = jwt.sign({
          iss: res[0].id,
          id: res[0].id,
          username: res[0].username
        }, ctx.$config.secret, { expiresIn: '1h' })
        ctx.cookies.set(
          'Edison_cookies', token, {
            domain: 'localhost',
            maxAge: 1000*60*60,
            httpOnly: true,
            overwrite: true
          } 
        )
        ctx.body = ctx.$mysql.backInfo(0, [], '登录成功')
      } else {
        ctx.body = ctx.$mysql.backInfo(-1, [], '账号或者密码不对')
      }
    } else {
      ctx.body = ctx.$mysql.backInfo(-1, [], '未找到账号')
    }
  })
}

const fn_users = async (ctx, next) => {
  await ctx.$mysql.query('SELECT * FROM users')
  .then(res => 
    ctx.body = ctx.$mysql.backInfo(0, res, '查找成功')
  )
}

module.exports = {
  'GET /': fn_,
  'POST /signin': fn_signin,
  'POST /login': fn_login,
  'GET /users': fn_users
}