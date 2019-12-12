
/**
 * 基础配置信息
 */
const config = {
  /**
   * @description ip地址以及端口配置
   */
  address: 'localhost',
  port: 3000,
  /**
   * @description mysql配置
   */
  database: {
    DATABASE: 'myemployees',
    USERNAME: 'root',
    PASSWORD: '123456',
    PORT: '3306',
    HOST: 'localhost'
  },
  /**
   * @description 路由前缀
   */
  routerPrefixes: '/blog'
}

module.exports = config