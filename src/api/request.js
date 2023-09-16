import axios from 'axios'
import { ElMessage } from 'element-plus'
const request = axios.create({
  baseURL: 'http://localhost:3000',
  timeout: 5000
})

request.interceptors.request.use((config) => {
  //config配置对象，headers属性请求头，经常给服务器端携带公共参数
  //加上请求体content-type
  config.headers['Content-Type'] = 'application/x-www-form-urlencoded'
  //返回配置对象
  return config
})
request.interceptors.response.use(
  (response) => {
    //成功回调
    return response.data
  },
  (error) => {
    //失败的回调
    let msg = ''
    let status = error.response
    switch (status) {
      case 401:
        msg = 'token过期'
        break
      case 403:
        msg = '无权访问'
        break
      case 404:
        msg = '请求地址错误'
        break
      case 500:
        msg = '服务器出现问题'
        break
      default:
        msg = '无网络'
    }
    ElMessage({
      type: 'error',
      message: msg
    })
    return Promise.reject(error)
  }
)
export default request
