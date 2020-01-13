const jwt = require('jsonwebtoken')
const { validatorUserLogin, validatorUserSignin } = require('../validator/users')

/**
 * 初始化 返回一个hello
 *
 * @param {*} ctx
 * @param {*} next
 */
const fn_ = async (ctx, next) => {
  ctx.body = `hello node.js+koa+mysql`
}

/**
 * 登录账号
 *
 * @param {*} ctx
 * @param {*} next
 * @returns
 */
const fn_login = async (ctx, next) => {
  const { errors, isValid } = validatorUserLogin(ctx.request.body)
  const { username, password } = ctx.request.body
  if (!isValid) {
    return ctx.body = ctx.$mysql.backInfo(-1, errors, '登陆失败')
  }
  await ctx.$mysql.query(` SELECT * FROM users WHERE (\`username\`= ?)`, username)
  .then(res => {
    if (res.length === 1) {
      if (res[0].password === password) {
        const token = jwt.sign({
          iss: res[0].id,
          id: res[0].id,
          username: res[0].username
        }, ctx.$config.secret, { expiresIn: '1h' })
        ctx.cookies.set(
          ctx.$config.tokenName, token, {
            domain: 'localhost',
            maxAge: 1000*60*60,
            httpOnly: true,
            overwrite: true
          } 
        )
        ctx.body = ctx.$mysql.backInfo(0, res[0], '登录成功')
      } else {
        ctx.body = ctx.$mysql.backInfo(-1, [], '账号或者密码不对')
      }
    } else {
      ctx.body = ctx.$mysql.backInfo(-1, [], '未找到账号')
    }
  })
}

/**
 * 退出账号
 *
 * @param {*} ctx
 * @param {*} next
 */
const fn_logout = async (ctx, next) => {
  ctx.cookies.set(
    ctx.$config.tokenName, null, {
      domain: 'localhost',
      maxAge: 0,
      httpOnly: true,
      overwrite: true
    } 
  )
  ctx.body = ctx.$mysql.backInfo(0, [], '退出成功')
}

/**
 * 注册账号
 *
 * @param {*} ctx
 * @param {*} next
 * @returns
 */
const fn_signin = async (ctx, next) => {
  const { errors, isValid } = validatorUserSignin(ctx.request.body)
  const { username, password, email, avator, sex, phone } = ctx.request.body
  if (!isValid) {
    return ctx.body = ctx.$mysql.backInfo(-1, errors, '注册失败')
  }
  await ctx.$mysql.query(` SELECT * FROM users WHERE (\`username\`= ?)`, username)
  .then(res => {
    if (res.length > 0) {
      ctx.body = ctx.$mysql.backInfo(-1, errors, '该用户名已经被注册')
      return Promise.reject('end')
    }
  })
  .then(async res => {
    await ctx.$mysql.query(`
    INSERT INTO users(
      \`username\`,
      \`password\`,
      \`email\`,
      \`avator\`,
      \`sex\`,
      \`phone\`)
    VALUES(?, ?, ?, ?, ?, ?)
    `, [
      username,
      password,
      email,
      avator,
      sex,
      phone
    ]).then(res => {
      ctx.body = ctx.$mysql.backInfo(0, [], '注册成功')
    })
  })
  .catch(err => {})
}

/**
 * 删除账号
 * 全部删除
 * @param {*} ctx
 * @param {*} next
 */
const fn_deleteAll = async (ctx, next) => {
  await ctx.$mysql.query(`DELETE FROM users`)
  .then(_ => {
    ctx.body = ctx.$mysql.backInfo(0, [], '批量删除成功')
  })
}

/**
 * 删除账号
 * 根据ID操作
 * @param {*} ctx
 * @param {*} next
 */
const fn_deleteItem = async (ctx, next) => {
  const { id } = ctx.params
  await ctx.$mysql.query(`DELETE FROM users WHERE id = ?`, id)
  .then(_ => {
    if (_.affectedRows) {
      ctx.body = ctx.$mysql.backInfo(0, [], '删除成功')
    } else {
      ctx.body = ctx.$mysql.backInfo(-1, [], '用户不存在或者已经删除')
    }
  })
}

/**
 * 修改账号
 * 根据ID操作
 * @param {*} ctx
 * @param {*} next
 */
const fn_updateItem = async (ctx, next) => {
  const { id, username, password, email, avator, sex, phone } = ctx.request.body
  await ctx.$mysql.query(`
  UPDATE users SET 
    \`username\` = ?,
    \`password\` = ?,
    \`email\` = ?,
    \`avator\` = ?,
    \`sex\` = ?,
    \`phone\` = ?
    WHERE id = ?
  `, [
    username,
    password,
    email,
    avator,
    sex,
    phone,
    id,
  ]).then(_ => {
    if (_.affectedRows) {
      ctx.body = ctx.$mysql.backInfo(0, [], '修改成功')
    } else {
      ctx.body = ctx.$mysql.backInfo(-1, [], '修改失败')
    }
  })
}

/**
 * 查找用户表
 *
 * @param {*} ctx
 * @param {*} next
 */
const fn_users = async (ctx, next) => {
  await ctx.$mysql.query('SELECT * FROM users')
  .then(res => 
    ctx.body = ctx.$mysql.backInfo(0, res, '查找成功')
  )
}

module.exports = {
  'GET /': fn_,
  'POST /login': fn_login,
  'GET /logout': fn_logout,
  'POST /signin': fn_signin,
  'DELETE /users/delete': fn_deleteAll,
  'DELETE /users/delete/:id': fn_deleteItem,
  'PUT /users/update': fn_updateItem,
  'GET /users': fn_users
}