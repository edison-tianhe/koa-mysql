const Koa = require('koa')
const bodyParser = require('koa-bodyparser')

const config = require('./config')
// const mysql = require('./mysql')
const controller = require('./middleware/controller')

const app = new Koa()

app.use(bodyParser())

app.use(controller())

app.use(async ctx => {
  ctx.body = `hello node.js+koa+mysql`
})

app.listen(config.port, config.address)

console.log(`\u001b[42m success \u001b[0m The project runs on http://${config.address}:${config.port}`)