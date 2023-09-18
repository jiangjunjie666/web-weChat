//创建user仓库
import { defineStore } from 'pinia'
//引入路由（常量路由）
import { reqGetFirends } from '@/api/user.js'
//创建
let useUserStore = defineStore('User', {
  state: () => {
    return {
      userFirendsList: JSON.parse(localStorage.getItem('userFirends')),
      userinfo: JSON.parse(localStorage.getItem('userinfo'))
    }
  },
  //处理逻辑
  actions: {
    //获取用户的所有好友信息
    async getFirends(str) {
      console.log(typeof str)
      let res = await reqGetFirends(str)
      if (res.code == 1) {
        //存储数据到本地
        localStorage.setItem('userFirends', JSON.stringify(res.data))
      }
    }
  },
  //计算属性
  getters: {}
})

//对外暴露
export default useUserStore
