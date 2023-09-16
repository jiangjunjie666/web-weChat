import request from './request'
const API = {
  //登录
  login: '/user/login',
  //注册
  register: '/user/reguser'
}
export const reqLogin = (data) => request.post(API.login, data)
export const reqRegister = (data) => request.post(API.register, data)
