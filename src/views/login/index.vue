<template>
  <div class="container">
    <div class="login-wrapper" v-if="key === 'login'">
      <div class="header">Login</div>
      <div class="form-wrapper">
        <input type="text" name="username" placeholder="username" class="input-item" v-model="data.username" />
        <input type="password" name="password" placeholder="password" class="input-item" v-model="data.password" />
        <div class="btn" @click="login">{{ key }}</div>
      </div>
      <div class="msg">
        Don't have account?
        <a href="#" @click="register">Sign up</a>
      </div>
    </div>
    <div class="login-wrapper" v-else>
      <div class="header">register</div>
      <div class="form-wrapper">
        <input type="text" name="username" placeholder="username" class="input-item" v-model="data.username" />
        <input type="password" name="password" placeholder="password" class="input-item" v-model="data.password" />
        <div class="btn" @click="login">{{ key }}</div>
      </div>
      <div class="msg">
        <a href="#" @click="register">Sign in</a>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { reqLogin, reqRegister } from '@/api/user.js'
import { ElMessage } from 'element-plus'
import { useRouter } from 'vue-router'
let $router = useRouter()
let key = ref('login')
let data = ref({
  username: '',
  password: ''
})
const register = () => {
  //换为注册
  if (key.value === 'login') {
    key.value = 'register'
  } else {
    key.value = 'login'
  }
}
const login = async () => {
  //登录或者注册
  if (key.value === 'login') {
    let res = await reqLogin(data.value)
    if (res.code == 0) {
      ElMessage({
        message: res.message,
        type: 'error'
      })
    } else {
      //登录成功将用户信息存储到本地
      localStorage.setItem('userinfo', JSON.stringify(res.data))
      //跳转至主页
      $router.push('/home')
    }
  } else {
    let res = await reqRegister(data.value)
    console.log(res)
    if (res.code == 0) {
      ElMessage({
        message: res.message,
        type: 'error'
      })
    } else {
      ElMessage({
        message: res.message,
        type: 'success'
      })
      //注册成功
      key.value = 'login'
    }
  }
}
</script>

<style lang="scss" scoped>
.container {
  height: 100vh;
  width: 100vw;
  display: flex;
  justify-content: center;
  align-items: center;
  background-image: linear-gradient(to right, #fbc2eb, #a6c1ee);
  .login-wrapper {
    background-color: #fff;
    padding: 50px;
    border-radius: 25px;
    .header {
      font-size: 30px;
      font-weight: 900;
      text-align: center;
      margin-bottom: 50px;
    }
    .form-wrapper {
      .input-item {
        display: block;
        width: 100%;
        margin-bottom: 20px;
        border: 0;
        padding: 10px;
        border-bottom: 1px solid rgb(128, 125, 125);
        font-size: 15px;
        outline: none;
      }
      .input-item:placeholder {
        text-transform: uppercase;
      }
      .btn {
        text-align: center;
        padding: 10px;
        width: 100%;
        margin-top: 40px;
        background-image: linear-gradient(to right, #a6c1ee, #fbc2eb);
        color: #fff;
      }
      .btn:hover {
        cursor: pointer;
      }
    }
    .msg {
      text-align: center;
      line-height: 88px;
    }
    a {
      // text-decoration-line: none;
      color: #abc1ee;
    }
  }
}
</style>
