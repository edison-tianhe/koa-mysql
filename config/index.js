
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
    DATABASE: 'blog',
    USERNAME: 'root',
    PASSWORD: '123456',
    PORT: '3306',
    HOST: 'localhost'
  },
  /**
   * @description 路由前缀
   */
  routerPrefixes: '',
  /**
   * @description 保存在客户端的token名称
   */
  tokenName: 'Edison_cookies'
}

module.exports = config