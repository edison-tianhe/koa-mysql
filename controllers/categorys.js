/**
 * 添加分类
 *
 * @param {*} ctx
 * @param {*} next
 * @returns
 */
const fn_insert = async (ctx, next) => {
  const { label, status } = ctx.request.body
  await ctx.$mysql.query(`INSERT INTO categorys(\`label\`, \`status\`)
  VALUES('${label}', '${status}')`)
  .then(res => {
    ctx.body = ctx.$mysql.backInfo(0, [], '添加成功')
  })
}

/**
 * 删除分类
 * 全部删除
 * @param {*} ctx
 * @param {*} next
 */
const fn_deleteAll = async (ctx, next) => {
  await ctx.$mysql.query(`DELETE FROM categorys`)
  .then(_ => {
    ctx.body = ctx.$mysql.backInfo(0, [], '批量删除成功')
  })
}

/**
 * 删除分类
 * 根据ID操作
 * @param {*} ctx
 * @param {*} next
 */
const fn_deleteItem = async (ctx, next) => {
  const { id } = ctx.params
  await ctx.$mysql.query(`DELETE FROM categorys WHERE id = '${id}'`)
  .then(_ => {
    if (_.affectedRows) {
      ctx.body = ctx.$mysql.backInfo(0, [], '删除成功')
    } else {
      ctx.body = ctx.$mysql.backInfo(-1, [], '分类不存在或者已经删除')
    }
  })
}

/**
 * 修改分类
 * 根据ID操作
 * @param {*} ctx
 * @param {*} next
 */
const fn_updateItem = async (ctx, next) => {
  const { id, label, status } = ctx.request.body
  await ctx.$mysql.query(`UPDATE categorys SET 
    \`label\` = '${label}',
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
 * 查找分类列表
 *
 * @param {*} ctx
 * @param {*} next
 */
const fn_categorys = async (ctx, next) => {
  await ctx.$mysql.query('SELECT * FROM categorys')
  .then(res => 
    ctx.body = ctx.$mysql.backInfo(0, res, '查找成功')
  )
}

/**
 * 查找已上线分类列表
 *
 * @param {*} ctx
 * @param {*} next
 */
const fn_find_categorys = async (ctx, next) => {
  await ctx.$mysql.query('SELECT id, label FROM categorys WHERE status = 1')
  .then(res => 
    ctx.body = ctx.$mysql.backInfo(0, res, '查找成功')
  )
}

module.exports = {
  'POST /categorys/insert': fn_insert,
  'DELETE /categorys/delete': fn_deleteAll,
  'DELETE /categorys/delete/:id': fn_deleteItem,
  'PUT /categorys/update': fn_updateItem,
  'GET /categorys': fn_categorys,
  'GET /findCategorys': fn_find_categorys
}