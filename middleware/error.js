module.exports = () => {
  return async (ctx, next) => {
    return next().catch((err) => {
      ctx.status = err.statusCode || err.status || 500
      ctx.body = err
    })
  }
}