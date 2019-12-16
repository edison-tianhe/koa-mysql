const fs = require('fs')
const path = require('path')
const Koa = require('koa')
const koaBody = require('koa-body')
const koaFavicon = require('koa-favicon')

const config = require('./config')
const controller = require('./middleware/controller')
const verifyToken = require('./middleware/verifyToken')
const myError = require('./middleware/error')
const utils = require('./utils/utils')

config.secret = utils.guid()

const app = new Koa()

app.use(koaFavicon(`${__dirname}/public/favicon.ico`))

app.use(async (ctx, next) => { // ? 指定跨域
  ctx.set('Access-Control-Allow-Origin', 'http://localhost:8080')
  ctx.set('Access-Control-Allow-Headers', 'Content-Type, Content-Length, Authorization, Accept, X-Requested-With , yourHeaderFeild')
  ctx.set('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS')
  ctx.set('Access-Control-Allow-Credentials', 'true')
  await next()
})

app.use(koaBody())

app.use(verifyToken())

app.use(myError())

app.use(controller().routes())
app.use(controller().allowedMethods())

app.listen(config.port, config.address, () => {
  console.log(`\u001b[42m biu \u001b[0m Come and play with me \u001b[32mhttp://${config.address}:${config.port}\u001b[0m`)
})