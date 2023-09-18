import request from './request'
const API = {
  //登录
  login: '/user/login',
  //注册
  register: '/user/reguser',
  //获取好友信息
  getFirends: '/api/userfriends',
  //获取单个用户的信息、
  getUserInfo: '/api/userinfo',
  //添加好友的接口
  addFriend: '/user/addfriend',
  //获取聊天记录
  getChatRecord: '/api/userchat'
}
export const reqLogin = (data) => request.post(API.login, data)
export const reqRegister = (data) => request.post(API.register, data)
//获取所有好友信息,携带query参数：firendsName
export const reqGetFirends = (firendsName) => request.get(API.getFirends + `?firendsName=${firendsName}`)
//获取用户信息
export const reqGetUserInfo = (username) => request.get(API.getUserInfo + `?username=${username}`)
//添加好友的接口
export const reqAddFriend = (data) => request.post(API.addFriend, data)
//获取聊天记录
export const reqGetChatRecord = (userId, firendId) => request.get(API.getChatRecord + `?userId=${userId}&firendId=${firendId}`)
