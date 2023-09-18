<template>
  <div class="User_card">
    <div class="t">
      <img :src="`http://127.0.0.1:3000/images/${data.avatar}`" alt="" />
      <p>{{ data.username }}</p>
    </div>
    <div class="m">
      <el-button style="background-color: #07c160; color: #fff" @click="addFir">添加到通讯录</el-button>
    </div>
  </div>
</template>

<script setup>
//接收父组件的数据
import { defineProps } from 'vue'
import { defineEmits } from 'vue'
import { reqAddFriend, reqGetUserInfo } from '@/api/user.js'
import { ref } from 'vue'
import { ElMessage } from 'element-plus'
import useUserStore from '@/store/modules/user.js'
let userStore = useUserStore()
//绑定自定义事件
// 定义自定义事件
const emits = defineEmits(['open'])
const props = defineProps({
  data: {
    type: Object,
    default: () => ({})
  },
  name: {
    type: String,
    default: ''
  }
})
const addFir = async () => {
  //加好友需要获取三个参数，自己的username，好友的firendUsername，以及自己的id
  let addData = {}
  let fir = JSON.parse(localStorage.getItem('userinfo')).username
  let id = JSON.parse(localStorage.getItem('userinfo')).id
  addData.username = fir
  addData.id = id
  addData.firendUsername = props.name
  let res = await reqAddFriend(addData)
  if (res.code == 0) {
    ElMessage({
      type: 'error',
      message: res.message
    })
  } else {
    //更新本地的用户数据
    let res = await reqGetUserInfo(JSON.parse(localStorage.getItem('userinfo')).username)
    console.log(res)
    if (res.code == 1) {
      localStorage.setItem('userinfo', JSON.stringify(res.data))
    }
    //重新拿到所有用户的数据
    userStore.getFirends(JSON.stringify(res.data.user_firends))
    ElMessage({
      type: 'success',
      message: res.message
    })
  }
}
</script>

<style lang="scss" scoped>
.User_card {
  width: 150px;
  height: 150px;
  position: absolute;
  top: 10px;
  //盒子阴影
  box-shadow: 1px 1px 1px 1px #bdbcbc;
  background-color: #fff;
  .t {
    display: flex;
    border-bottom: 1px solid rgb(230, 228, 228);
    // padding: px;
    img {
      width: 50px;
      height: 50px;
      border-radius: 5px;
      margin: 20px 0 10px 20px;
    }
    p {
      margin: 40px 0 0 10px;
    }
  }
  .m {
    display: flex;
    justify-content: center;
    margin-top: 20px;
  }
}
</style>
