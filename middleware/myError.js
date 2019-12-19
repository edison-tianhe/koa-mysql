module.exports = async (ctx, next) => {
  try {
    await next()
  } catch(e) {
    let status = e.status || 500
    let message = e.message || '服务器错误'

    ctx.status = status
    ctx.body = {
      code: status,
      data: [],
      msg: message
    }
  }
}