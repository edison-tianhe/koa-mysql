const mysql = require('mysql')

const config = require('../config')
const mysqlCreateTable = require('./createTable')

let nodeSql = null
const startTime = Date.now()

class Mysql {
  constructor () {

    this.backInfo = function (code, data, msg) {
      return { code: code, data: data, msg: msg }
    }

    this.pool = mysql.createPool({
      host     : config.database.HOST,
      user     : config.database.USERNAME,
      password : config.database.PASSWORD,
      database : config.database.DATABASE
    })

    console.log(`\u001b[44m success \u001b[0m \u001b[36mmaster, The databases is ready!\u001b[0m`)
  }
  query (sql, values) {
    return new Promise((resolve, reject) => {
      this.pool.getConnection((err, connection) => {
        if (err) {
          reject( err )
        } else {
          connection.query(sql, values, (error, results, fields) => {
            if (error) reject(error)
            else resolve(results)
            connection.release()
          })
        }
      })
    })
  }
  end () {
    return new Promise((resolve, reject) => {
      this.pool.end(err => {
        if(err){
          console.log('\u001b[41m x \u001b[0m \u001b[31m关闭数据库连接失败！\u001b[0m')
          reject(err)
        }
        console.log('\u001b[42m √ \u001b[0m \u001b[32m关闭数据库连接成功！\u001b[0m')
        resolve('关闭数据库连接成功')
      })
    })
  }
}

nodeSql = new Mysql()

Promise.all(
  mysqlCreateTable.map(_ => {
    return nodeSql.query(_)
  })
).then(_ => {
  console.log(`\u001b[45m ... \u001b[0m \u001b[35m数据库扫描/创建表 用时:${Date.now() - startTime}ms \u001b[0m`)
})
.catch(e => console.log(e))

module.exports = nodeSql
