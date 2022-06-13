import Cookies from 'js-cookie'

const TokenKey = 'hr_cms_token'
// 获取token，从本地cookies中获取
export function getToken() {
  return Cookies.get(TokenKey)
}
// 储存token，储存token到cookies
export function setToken(token) {
  return Cookies.set(TokenKey, token)
}
// 删除token，删除本地储存在cookies里的token
export function removeToken() {
  return Cookies.remove(TokenKey)
}
