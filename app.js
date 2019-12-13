const Koa = require('koa')
const bodyParser = require('koa-bodyparser')

const config = require('./config')
const mysql = require('./mysql')
const controller = require('./middleware/controller')

const app = new Koa()

app.use(async (ctx, next) => {
  ctx.state.$mysql = mysql
  await next()
})

app.use(bodyParser())

app.use(controller())

app.use(async ctx => {
  ctx.body = `hello node.js+koa+mysql`
})

app.listen(config.port, config.address, () => {
  console.log(`\u001b[42m biu \u001b[0m Come and play with me \u001b[32mhttp://${config.address}:${config.port}\u001b[0m`)
})