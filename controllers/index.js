const mysql = require('../mysql')
const jwt = require('jsonwebtoken')

const fn_index = async (ctx, next) => {
  ctx.response.body = `<h1>Index</h1>
      <form action="/blog/login" method="post">
          <p>Name: <input name="userName" value="koa"></p>
          <p>Password: <input name="passWord" type="password"></p>
          <p><input type="submit" value="Submit"></p>
      </form>`
}

const fn_signin = async (ctx, next) => {
  let
      name = ctx.request.body.name || '',
      password = ctx.request.body.password || ''
  if (name === 'koa' && password === '12345') {
      ctx.response.body = `<h1>Welcome, ${name}!</h1>`
  } else {
      ctx.response.body = `<h1>Login failed!</h1>
      <p><a href="/">Try again</a></p>`
  }
}

const fn_login = async (ctx, next) => {
  const token = jwt.sign(ctx.request.body, 'shhhhh')
  const payload = jwt.verify(token, 'shhhhh')
  console.log(payload)
  let { userName, passWord } = ctx.request.body
  await mysql.query(` SELECT * FROM users WHERE (\`userName\`='${userName}')`)
  .then(res => {
    if (res.length === 1) {
      if (res[0].passWord === passWord) {
        ctx.body = mysql.backInfo(0, [], '登录成功')
      } else {
        ctx.body = mysql.backInfo(-1, [], '账号或者密码不对')
      }
    } else {
      ctx.body = mysql.backInfo(-1, [], '未找到账号')
    }
  })
  .catch(err => {
    ctx.body = err
  })
}

module.exports = {
  'GET /': fn_index,
  'POST /signin': fn_signin,
  'POST /login': fn_login
}