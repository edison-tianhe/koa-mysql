const Koa = require('koa')
const koaBody = require('koa-body')
const koaFavicon = require('koa-favicon')

const config = require('./config')
const controller = require('./middleware/controller')
const verifyToken = require('./middleware/verifyToken')

const app = new Koa()

app.use(koaFavicon(`${__dirname}/public/favicon.ico`))

app.use(koaBody())

app.use(controller())

app.use(verifyToken())

app.use(async ctx => {
  ctx.body = `hello node.js+koa+mysql`
})

app.listen(config.port, config.address, () => {
  console.log(`\u001b[42m biu \u001b[0m Come and play with me \u001b[32mhttp://${config.address}:${config.port}\u001b[0m`)
})