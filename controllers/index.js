const mysql = require('../mysql')
const jwt = require('jsonwebtoken')
const config = require('../config')

const fn_ = async (ctx, next) => {
  ctx.body = `hello node.js+koa+mysql`
}

const fn_index = async (ctx, next) => {
  await mysql.query('SELECT * FROM employees')
  .then(res => 
    ctx.body = mysql.backInfo(0, res, '查找成功')
  )
}

const fn_login = async (ctx, next) => {
  let { userName, passWord } = ctx.request.body
  await mysql.query(` SELECT * FROM users WHERE (\`userName\`='${userName}')`)
  .then(res => {
    if (res.length === 1) {
      if (res[0].passWord === passWord) {
        const token = jwt.sign({
          iss: res[0].id,
          id: res[0].id,
          userName: res[0].userName
        }, config.secret, { expiresIn: '1h' })
        ctx.cookies.set(
          'Edison_cookies', token, {
            domain: 'localhost',
            maxAge: 1000*60*60,
            httpOnly: true,
            overwrite: true
          } 
        )
        ctx.body = mysql.backInfo(0, [], '登录成功')
      } else {
        ctx.body = mysql.backInfo(-1, [], '账号或者密码不对')
      }
    } else {
      ctx.body = mysql.backInfo(-1, [], '未找到账号')
    }
  })
}

module.exports = {
  'GET /': fn_,
  'POST /login': fn_login,
  'GET /find': fn_index
}