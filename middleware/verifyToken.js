module.exports = () => {
  return async (ctx, next) => {
    console.log(ctx.url)
    await next()
  }
};