const fn_home_find = async (ctx, next) => {
  let _data = []
  await ctx.state.$mysql.query('SELECT * FROM employees')
  .then(_ => 
    ctx.body = {
      code: 0,
      data: _,
      msg: '成功'
    }
  )
}

module.exports = {
  'GET /home': fn_home_find
}