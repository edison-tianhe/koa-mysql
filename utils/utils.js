const fs = require('fs')
const path = require('path')

/**
 * 组合二十位随机数
 */
function guid (str = '') {
    return `${randomTo4()}${str}${randomTo4()}${str}${randomTo4()}${str}${randomTo4()}${str}${randomTo4()}`
}

/**
 * 生成四位随机数
 */
function randomTo4 () {
    return (((1+Math.random())*0x10000)|0).toString(16).substring(1)
}

/**
 * 获取文件的后缀
 * ! 如果使用默认文件上传后的名字，则不需要这个方法
 * ! 因为 koa-body 配置 formidable：{keepExtensions: true} 之后会直接保留原始的文件后缀
 * @param {*} name
 * @returns
 */
function getUploadFileExt (name) {
    const ext = name.split('.')
    return ext[ext.length - 1]
}

/**
 * 获取文件名
 * ! 如果使用默认文件上传后的名字，则不需要这个方法
 * ! 因为 koa-body 配置 formidable：{keepExtensions: true} 之后会直接保留原始的文件后缀
 * @param {*} name
 * @returns
 */
function getUploadFileName (name) {
    const ext = name.split('.')
    return ext[0]
}

/**
 * 生成文件夹名称
 */
function getUploadDirName (){
    const date = new Date()
    let month = Number.parseInt(date.getMonth()) + 1
    month = month.toString().length > 1 ? month : `0${month}`
    const dir = `${date.getFullYear()}${month}${date.getDate()}`
    return dir
}

/**
 * 检查文件夹路径是否存在，如果不存在则创建文件夹
 *
 * @param {*} dirpath 路径
 * @param {*} root 检查指定目录
 */
function checkDirExist (dirpath, root = __dirname) {
    if (!fs.existsSync(dirpath)) {
        let pathtmp = root
        dirpath.split('/').forEach((dirname) => {
            pathtmp = path.join(pathtmp, dirname)
            if (!fs.existsSync(pathtmp)) {
                fs.mkdirSync(pathtmp)
            }
        })
    }
}

/**
 * 判断该值是否为空
 *
 * @param {*} value 需要判断的值
 */
function isEmpty (value) {
	return value === undefined || value === null ||
	(typeof value === 'object' && Object.keys(value).length === 0) ||
	(typeof valur === 'string' && value.trim().length === 0)
}

module.exports = {
    guid,
    getUploadFileExt,
    getUploadFileName,
    getUploadDirName,
    checkDirExist,
    isEmpty
}