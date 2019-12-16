const mysql = require('../mysql')

const fn_home_end = async (ctx, next) => {
  await mysql.end()
  .then(_ => 
    ctx.body = mysql.backInfo(0, [], '退出成功')
  )
}

module.exports = {
  'GET /end': fn_home_end,
}