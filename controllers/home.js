const fn_home_find = async (ctx, next) => {
  await ctx.state.$mysql.query('SELECT * FROM employees')
  .then(_ => 
    ctx.body = {
      code: 0,
      data: _,
      msg: '成功'
    }
  )
}

const fn_home_end = async (ctx, next) => {
  await ctx.state.$mysql.end()
  .then(_ => 
    ctx.body = {
      code: 0,
      data: _,
      msg: '成功'
    }
  )
}

module.exports = {
  'GET /home': fn_home_find,
  'GET /end': fn_home_end,
}