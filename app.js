const path = require('path')
const Koa = require('koa')
const koaBody = require('koa-body')
const koaFavicon = require('koa-favicon')
const koaStatic = require('koa-static')

const config = require('./config')
const mysql = require('./mysql')
const controller = require('./middleware/controller')
const utils = require('./utils/utils')

config.secret = utils.guid('-')

const app = new Koa()

app.context.$config = config
app.context.$mysql = mysql

app.use(koaFavicon(`${__dirname}/public/favicon.ico`))

app.use(koaStatic(path.join(__dirname, 'public')))

app.use(async (ctx, next) => { // ? 指定跨域
  ctx.set('Access-Control-Allow-Origin', 'http://localhost:8080')
  ctx.set('Access-Control-Allow-Headers', 'Content-Type, Content-Length, Authorization, Accept, X-Requested-With , yourHeaderFeild')
  ctx.set('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS')
  ctx.set('Access-Control-Allow-Credentials', 'true')
  await next()
})

app.use(koaBody({
  multipart: true,
  formidable: {
    uploadDir: path.join(__dirname, 'public/upload'),
    keepExtensions: true,
    onFileBegin: (name, file) => {
      utils.checkDirExist(`public/upload/${utils.getUploadDirName()}`, __dirname)
      file.path = `public/upload/${utils.getUploadDirName()}/${utils.guid()}.${file.name.split('.')[1]}`
    }
  }
}))

app.use(controller().routes())
app.use(controller().allowedMethods())

app.on('error', err => {
  // https://segmentfault.com/a/1190000004612409#item-3
  console.error('server error1111')
})

app.listen(config.port, config.address, () => {
  console.log(`\u001b[42m biu \u001b[0m Come and play with me \u001b[32mhttp://${config.address}:${config.port}\u001b[0m`)
})