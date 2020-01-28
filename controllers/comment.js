/**
 * 添加文章评论
 *
 * @param {*} ctx
 * @param {*} next
 * @returns
 */
const fn_insert = async (ctx, next) => {
  const { articleId, name, email, blog, comment, privacy, browseN, browseV } = ctx.request.body
  await ctx.$mysql.query(`
    INSERT INTO articleComment(
      \`articleId\`,
      \`name\`,
      \`email\`,
      \`blog\`,
      \`comment\`,
      \`privacy\`,
      \`browseN\`,
      \`browseV\`
    ) VALUES(?, ?, ?, ?, ?, ?, ?, ?)
    `, [
    articleId,
    name,
    email,
    blog,
    comment,
    privacy,
    browseN,
    browseV
  ]).then(async res => {
    const _res = await ctx.$mysql.query(`SELECT * FROM articles WHERE id = ?`, articleId)
    await ctx.$mysql.query(`UPDATE articles SET \`comment\` = ? WHERE id = ?`, [
      _res[0].comment + 1,
      articleId
    ])
    ctx.body = ctx.$mysql.backInfo(0, [], '评论成功')
  })
}

/**
 * 回复文章评论
 *
 * @param {*} ctx
 * @param {*} next
 * @returns
 */
const fn_reply = async (ctx, next) => {
  const { id, articleId, name, email, blog, comment, replyer, browseN, browseV, createtime } = ctx.request.body
  let replyArr = await ctx.$mysql.query(`SELECT * FROM articlecomment WHERE id = ?`, id)
  let newObj = {
    id,
    name,
    email,
    blog,
    comment,
    replyer,
    browseN,
    browseV,
    createtime
  }
  if (replyArr.length) {
    replyArr = replyArr[0].replyList ? JSON.parse(replyArr[0].replyList) : []
  } else {
    replyArr = []
  }
  replyArr.push(newObj)
  await ctx.$mysql.query(`UPDATE articlecomment SET \`replyList\` = ? WHERE id = ?`, [JSON.stringify(replyArr), id])
  // *评论数量累加
  const _articlesRes = await ctx.$mysql.query(`SELECT * FROM articles WHERE id = ?`, articleId)
  await ctx.$mysql.query(`UPDATE articles SET \`comment\` = ? WHERE id = ?`, [
    _articlesRes[0].comment + 1,
    articleId
  ])
  ctx.body = ctx.$mysql.backInfo(0, [], '评论成功')
}

/**
 * 查找文章评论列表
 *
 * @param {*} ctx
 * @param {*} next
 */
const fn_articles_comment = async (ctx, next) => {
  const { articleId, page, size } = ctx.params
  const _articleId = Number(articleId)
  const _page = (Number(page) - 1) * size
  const _size = Number(size)
  await ctx.$mysql.query(`SELECT
    SQL_CALC_FOUND_ROWS
    *,
    DATE_FORMAT(createtime, '%Y-%m-%d %H:%i:%S') as createtime,
    DATE_FORMAT(updatetime, '%Y-%m-%d %H:%i:%S') as updatetime
    FROM articleComment
    WHERE articleId = ?
    ORDER BY createtime DESC limit ?, ?;
    select FOUND_ROWS();
  `, [_articleId, _page, _size]).then(async res => {
    ctx.body = ctx.$mysql.backInfo(0, {
      data: res[0].map(v => {
        v.replyList = v.replyList ? JSON.parse(v.replyList) : []
        return v
      }),
      page: Number(page),
      size: Number(size),
      total: res[1][0]['FOUND_ROWS()']
    }, '查找成功')
  })
}

module.exports = {
  'POST /articles/comment': fn_insert,
  'PUT /articles/reply': fn_reply,
  'GET /articles/comment/:articleId/:page/:size': fn_articles_comment,
}