
const fn_upload = async (ctx, next) => {
  const file = ctx.request.files && ctx.request.files.file
  if (file) {
    ctx.body = ctx.$mysql.backInfo(0, {
      path: file.path.slice(7)
    }, '上传成功')
  } else {
    ctx.body = ctx.$mysql.backInfo(-1, [], '未选择文件')
  }
}

module.exports = {
  'POST /upload': fn_upload
}