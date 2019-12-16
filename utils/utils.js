/**
 * 组合十六位随机数
 */
const guid = function () {
    return `${randomTo4()}-${randomTo4()}-${randomTo4()}-${randomTo4()}`
}

/**
 * 生成四位随机数
 */
function randomTo4() {
    return (((1+Math.random())*0x10000)|0).toString(16).substring(1)
}

module.exports = {
    guid
}