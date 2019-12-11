const fs = require('fs')
const path = require('path')
const config = require('../config')

/**
 * 操作暴露出来的router
 *
 * @param {*} router 路由插件
 * @param {*} mapping js文件
 */
function addMapping(router, mapping) {
  for (let url in mapping) {
      if (url.startsWith('GET ')) {
          let path = url.substring(4)
          router.get(path, mapping[url])
      } else if (url.startsWith('POST ')) {
          let path = url.substring(5)
          router.post(path, mapping[url])
      } else {
          console.log(`invalid URL: ${url}`)
      }
  }
}

/**
 * 扫描指定目录下的js文件
 *
 * @param {*} router 路由插件
 * @param {*} dir 指定目录
 */
function addControllers(router, dir) {
  const files = fs.readdirSync(`${path.resolve(__dirname, '..')}\\${dir}`)
  const js_files = files.filter(_ => {
      return _.endsWith('.js')
  })

  for (let f of js_files) {
      let mapping = require(`${path.resolve(__dirname, '..')}\\${dir}\\${f}`)
      addMapping(router, mapping)
  }
}

module.exports = dir => {
    let
        controllers_dir = dir || 'controllers',
        router = require('koa-router')({
          prefix: `${config.routerPrefixes || ''}`
        })
    addControllers(router, controllers_dir)
    return router.routes()
};