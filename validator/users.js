const Validator = require('validator')
const { isEmpty } = require('../utils/utils')

function validatorUserSignin (data) {
  const errors = {}

  data.username = !isEmpty(data.username) ? data.username : ''
  data.email = !isEmpty(data.email) ? data.email : ''
  data.password = !isEmpty(data.password) ? data.password : ''
  data.avator = !isEmpty(data.avator) ? data.avator : ''
  data.sex = !isEmpty(data.sex) ? data.sex : ''
  data.phone = !isEmpty(data.phone) ? data.phone : ''

  if(!Validator.isLength(data.username, {min:2,max:20})){
    errors.username="用户名长度不能小于2位并且不能大于20位"
  }

  if(Validator.isEmpty(data.username)){
    errors.username = "用户名不能为空"
  }

  if(Validator.isEmpty(data.email)){
    errors.email = "邮箱不能为空"
  }

  if(!Validator.isEmail(data.email)){
    errors.email = "邮箱不合法"
  }

  if(Validator.isEmpty(data.password)){
    errors.password = "密码不能为空"
  }

  if(!Validator.isLength(data.password, {min:6,max:20})){
    errors.password = "密码的长度不能小于6位并且不能大于20位"
  }

  if(Validator.isEmpty(data.avator)){
    errors.avator = "头像不能为空"
  }

  if(Validator.isEmpty(data.sex)){
    errors.sex = "性别不能为空"
  }

  if(!Validator.isInt(data.sex)){
    errors.sex = "性别无法识别"
  }

  if(Validator.isEmpty(data.phone)){
    errors.phone = "手机号不能为空"
  }

  if(!Validator.isMobilePhone(data.phone)){
    errors.phone = "请输入正确的手机号"
  }

  return{
		errors: errors,
		isValid: isEmpty(errors)
	}
}

function validatorUserLogin (data) {
  const errors = {}

  data.username = !isEmpty(data.username) ? data.username : ''
  data.password = !isEmpty(data.password) ? data.password : ''

  if(Validator.isEmpty(data.username)){
    errors.username = "用户名不能为空"
  }

  if(Validator.isEmpty(data.password)){
    errors.password = "密码不能为空"
  }

  return{
		errors: errors,
		isValid: isEmpty(errors)
	}
}

module.exports = {
  validatorUserLogin,
  validatorUserSignin
}