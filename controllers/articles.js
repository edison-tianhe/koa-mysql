/**
 * 添加文章
 *
 * @param {*} ctx
 * @param {*} next
 * @returns
 */
const fn_insert = async (ctx, next) => {
  const { title, content, category, stick, status } = ctx.request.body
  await ctx.$mysql.query(`INSERT INTO articles(\`userId\`, \`title\`, \`content\`, \`category\`, \`stick\`, \`status\`)
  VALUES('${ctx.$activeUserId}', '${title}', '${content}', '${category}', ${stick}, ${status})`)
  .then(res => {
    ctx.body = ctx.$mysql.backInfo(0, [], '添加成功')
  })
}

/**
 * 删除文章
 * 全部删除
 * @param {*} ctx
 * @param {*} next
 */
const fn_deleteAll = async (ctx, next) => {
  await ctx.$mysql.query(`DELETE FROM articles`)
  .then(_ => {
    ctx.body = ctx.$mysql.backInfo(0, [], '批量删除成功')
  })
}

/**
 * 删除文章
 * 根据ID操作
 * @param {*} ctx
 * @param {*} next
 */
const fn_deleteItem = async (ctx, next) => {
  const { id } = ctx.params
  await ctx.$mysql.query(`DELETE FROM articles WHERE id = '${id}'`)
  .then(_ => {
    if (_.affectedRows) {
      ctx.body = ctx.$mysql.backInfo(0, [], '删除成功')
    } else {
      ctx.body = ctx.$mysql.backInfo(-1, [], '文章不存在或者已经删除')
    }
  })
}

/**
 * 修改文章
 * 根据ID操作
 * @param {*} ctx
 * @param {*} next
 */
const fn_updateItem = async (ctx, next) => {
  const { id, userId, title, content, category, stick, status } = ctx.request.body
  await ctx.$mysql.query(`UPDATE users SET 
    \`userId\` = '${userId}',
    \`title\` = '${title}',
    \`content\` = '${content}',
    \`category\` = '${category}',
    \`stick\` = '${stick}',
    \`status\` = '${status}'
    WHERE id = ${id}`
  ).then(_ => {
    if (_.affectedRows) {
      ctx.body = ctx.$mysql.backInfo(0, [], '修改成功')
    } else {
      ctx.body = ctx.$mysql.backInfo(-1, [], '修改失败')
    }
  })
}

/**
 * 查找文章列表
 *
 * @param {*} ctx
 * @param {*} next
 */
const fn_articles = async (ctx, next) => {
  await ctx.$mysql.query('SELECT * FROM articles')
  .then(res => 
    ctx.body = ctx.$mysql.backInfo(0, res, '查找成功')
  )
}

module.exports = {
  'POST /articles/insert': fn_insert,
  'DELETE /articles/delete': fn_deleteAll,
  'DELETE /articles/delete/:id': fn_deleteItem,
  'PUT /articles/update': fn_updateItem,
  'GET /articles': fn_articles
}