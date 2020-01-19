/**
 * 添加文章
 *
 * @param {*} ctx
 * @param {*} next
 * @returns
 */
const fn_insert = async (ctx, next) => {
  const { title, intro, content, contentHTML, category, stick, status } = ctx.request.body
  // *原来是写法有误,导致mysql语法报错~现在已经不用
  const newContentHTML = contentHTML.replace(/[<">']/g, (target) => {
    return {
        '<': '&lt;',
        '"': '&quot;',
        '>': '&gt;',
        "'": '&#39;'
    }[target]
  })
  await ctx.$mysql.query(`
  INSERT INTO articles(
    \`userId\`,
    \`title\`,
    \`intro\`,
    \`content\`,
    \`contentHTML\`,
    \`category\`,
    \`stick\`,
    \`status\`
  ) VALUES(?, ?, ?, ?, ?, ?, ?, ?)
  `, [
    ctx.$activeUserId,
    title,
    intro,
    content,
    contentHTML,
    category,
    stick,
    status
  ]).then(res => {
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
  await ctx.$mysql.query(`DELETE FROM articles WHERE id = ?`, id)
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
  const { id, userId, title, intro, content, contentHTML, category, stick, status } = ctx.request.body
  // *原来是写法有误,导致mysql语法报错~现在已经不用
  const newContentHTML = contentHTML.replace(/[<">']/g, (target) => {
    return {
        '<': '&lt;',
        '"': '&quot;',
        '>': '&gt;',
        "'": '&#39;'
    }[target]
  })
  await ctx.$mysql.query(`
  UPDATE articles SET 
    \`userId\` = ?,
    \`title\` = ?,
    \`intro\` = ?,
    \`content\` = ?,
    \`contentHTML\` = ?,
    \`category\` = ?,
    \`stick\` = ?,
    \`status\` = ?
    WHERE id = ?
  `, [
    userId,
    title,
    intro,
    content,
    contentHTML,
    category,
    stick,
    status,
    id
  ]).then(_ => {
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
  await ctx.$mysql.query(`SELECT
    articles.id,
    articles.userId,
    users.username,
    users.avator,
    articles.category,
    articles.title,
    articles.intro,
    articles.stick,
    articles.status,
    DATE_FORMAT(articles.createtime, '%Y-%m-%d %H:%i:%S') as createtime,
    DATE_FORMAT(articles.updatetime, '%Y-%m-%d %H:%i:%S') as updatetime
    FROM articles LEFT JOIN users on articles.userId = users.id
    ORDER BY articles.updatetime DESC`
  ).then(res => 
    ctx.body = ctx.$mysql.backInfo(0, res, '查找成功')
  )
}

/**
 * 文章详情
 *
 * @param {*} ctx
 * @param {*} next
 */
const fn_find_articles = async (ctx, next) => {
  const { id } = ctx.params
  await ctx.$mysql.query(`SELECT * FROM articles WHERE id = ?`, id)
  .then(res => 
    ctx.body = ctx.$mysql.backInfo(0, res[0], '查找成功')
  )
}

/**
 * 文章置顶开关
 *
 * @param {*} ctx
 * @param {*} next
 */
const fn_articles_stick = async (ctx, next) => {
  const { id, stick } = ctx.params
  await ctx.$mysql.query(`UPDATE articles SET \`stick\` = ? WHERE id = ?`, [stick, id])
  .then(_ => {
    if (_.affectedRows) {
      ctx.body = ctx.$mysql.backInfo(0, [], '修改置顶状态成功')
    } else {
      ctx.body = ctx.$mysql.backInfo(-1, [], '修改置顶状态失败')
    }
  })
}

/**
 * 文章发布开关
 *
 * @param {*} ctx
 * @param {*} next
 */
const fn_articles_status = async (ctx, next) => {
  const { id, status } = ctx.params
  await ctx.$mysql.query(`UPDATE articles SET \`status\` = ? WHERE id = ?`, [status, id])
  .then(_ => {
    if (_.affectedRows) {
      ctx.body = ctx.$mysql.backInfo(0, [], '修改发布状态成功')
    } else {
      ctx.body = ctx.$mysql.backInfo(-1, [], '修改发布状态失败')
    }
  })
}

module.exports = {
  'POST /articles/insert': fn_insert,
  'DELETE /articles/delete': fn_deleteAll,
  'DELETE /articles/delete/:id': fn_deleteItem,
  'PUT /articles/update': fn_updateItem,
  'GET /articles': fn_articles,
  'GET /articles/:id': fn_find_articles,
  'PUT /articles/stick/:id/:stick': fn_articles_stick,
  'PUT /articles/status/:id/:status': fn_articles_status
}