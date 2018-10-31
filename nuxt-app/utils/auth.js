import Cookies from 'js-cookie'

const TokenKey = 'Admin-Token'
const User = 'User'

export function getToken() {
  return Cookies.get(TokenKey)
}

export function setToken(token) {
  return Cookies.set(TokenKey, token)
}

export function getUser() {
  return Cookies.get(User)
}

export function setUser(user) {
  return Cookies.set(User, user)
}

export function removeToken() {
  Cookies.remove(TokenKey)
  Cookies.remove(User)
}
