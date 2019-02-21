/**
 * Created by jiachenpan on 16/11/18.
 */

//正则
export const regexp = {
  IsChineseName(s){
    return /^[\u2E80-\u9FFF]{2,5}$/.test(s)
  },
  HasIllegalSign(s){
    return /[\?!#$%\\^&\*\(\)\|\[\]]+/.test(s)
  },
  IsNumber(s){
    return /^\d+$/.test(s)
  },
  isArray(s){
    return Object.prototype.toString.call(s) === '[object Array]'
  },
  isObject(s){
    return Object.prototype.toString.call(s) === '[object Object]'
  },
}

/* 合法uri*/
export function validateURL(textval) {
  const urlregex = /^(https?|ftp):\/\/([a-zA-Z0-9.-]+(:[a-zA-Z0-9.&%$-]+)*@)*((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9][0-9]?)(\.(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9]?[0-9])){3}|([a-zA-Z0-9-]+\.)*[a-zA-Z0-9-]+\.(com|edu|gov|int|mil|net|org|biz|arpa|info|name|pro|aero|coop|museum|[a-zA-Z]{2}))(:[0-9]+)*(\/($|[a-zA-Z0-9.,?'\\+&%$#=~_-]+))*$/
  return urlregex.test(textval)
}

/* 小写字母*/
export function validateLowerCase(str) {
  const reg = /^[a-z]+$/
  return reg.test(str)
}

/* 大写字母*/
export function validateUpperCase(str) {
  const reg = /^[A-Z]+$/
  return reg.test(str)
}

/* 大小写字母*/
export function validatAlphabets(str) {
  const reg = /^[A-Za-z]+$/
  return reg.test(str)
}
