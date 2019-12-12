const mysql = require('mysql')
const config = require('../config')

const pool  = mysql.createPool({
  host     : config.database.HOST,
  user     : config.database.USERNAME,
  password : config.database.PASSWORD,
  database : config.database.DATABASE
})

pool.getConnection((err, connection) => {
  if (err) throw err
  console.log(`\u001b[44m success \u001b[0m \u001b[36mmaster, The databases is ready!\u001b[0m`)
})

class Mysql {
  constructor () {}
  query (sql) {
    return new Promise((resolve, reject) => {
      pool.query(sql, (error, results, fields) => {
        if (error) {
          throw error
        }
        resolve(results)
      })
    })
  }
}

module.exports = new Mysql()
