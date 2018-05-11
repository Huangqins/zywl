// 登录认证
import Cookies from 'js-cookie';

// Token默认角色
const TokenKey = 'Admin-token';
const UserName ='Admin';
const isTry = 'isTry';  //是否试用版,可用性
const Model = 'model' //菜单权限

export function getToken() {
    return Cookies.get(TokenKey)
}

export function setToken(token) {
    return Cookies.set(TokenKey, token)
}

export function removeToken() {
    return Cookies.remove(TokenKey)
}

export function getUserName() {
    return Cookies.get(UserName)
}

export function setUserName(username) {
    return Cookies.set(UserName, username)
}

export function removeUserName() {
    return Cookies.remove(UserName)
}
export function setUsability(istry) {
    return Cookies.set(isTry, istry)
}

export function getUsability() {
    return Cookies.get(isTry)
}

export function setUserModel(model) {
    return Cookies.set(Model, model)
}

export function getUserModel() {
    return Cookies.get(Model)
}