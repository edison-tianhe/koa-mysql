const fn_home_end = async (ctx, next) => {
  await ctx.$mysql.end()
  .then(_ => 
    ctx.body = ctx.$mysql.backInfo(0, [], '退出成功')
  )
}

module.exports = {
  'GET /end': fn_home_end,
}