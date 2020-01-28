/**
 * 添加留言
 *
 * @param {*} ctx
 * @param {*} next
 * @returns
 */
const fn_insert = async (ctx, next) => {
  const { name, email, blog, comment, privacy, browseN, browseV } = ctx.request.body
  await ctx.$mysql.query(`
    INSERT INTO messageComment(
      \`name\`,
      \`email\`,
      \`blog\`,
      \`comment\`,
      \`privacy\`,
      \`browseN\`,
      \`browseV\`
    ) VALUES(?, ?, ?, ?, ?, ?, ?)
    `, [
    name,
    email,
    blog,
    comment,
    privacy,
    browseN,
    browseV
  ]).then(async res => {
    ctx.body = ctx.$mysql.backInfo(0, [], '留言成功')
  })
}

/**
 * 回复留言
 *
 * @param {*} ctx
 * @param {*} next
 * @returns
 */
const fn_reply = async (ctx, next) => {
  const { id, name, email, blog, comment, replyer, browseN, browseV, createtime } = ctx.request.body
  let replyArr = await ctx.$mysql.query(`SELECT * FROM messageComment WHERE id = ?`, id)
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
  await ctx.$mysql.query(`UPDATE messageComment SET \`replyList\` = ? WHERE id = ?`, [JSON.stringify(replyArr), id])
  ctx.body = ctx.$mysql.backInfo(0, [], '回复留言成功')
}

/**
 * 查找留言列表
 *
 * @param {*} ctx
 * @param {*} next
 */
const fn_message_comment = async (ctx, next) => {
  const { page, size } = ctx.params
  const _page = (Number(page) - 1) * size
  const _size = Number(size)
  await ctx.$mysql.query(`SELECT
    SQL_CALC_FOUND_ROWS
    *,
    DATE_FORMAT(createtime, '%Y-%m-%d %H:%i:%S') as createtime,
    DATE_FORMAT(updatetime, '%Y-%m-%d %H:%i:%S') as updatetime
    FROM messageComment
    ORDER BY createtime DESC limit ?, ?;
    select FOUND_ROWS();
  `, [_page, _size]).then(async res => {
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
  'POST /meaasge/comment': fn_insert,
  'PUT /meaasge/reply': fn_reply,
  'GET /meaasge/list/:page/:size': fn_message_comment,
}