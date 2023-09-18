<template>
  <div class="chat_my">
    <img :src="`http://127.0.0.1:3000/images/${src}`" alt="" />
    <p>{{ message.chat_message }}</p>
  </div>
</template>

<script setup>
import { defineProps, computed } from 'vue'
const props = defineProps({
  message: {
    type: Object,
    default: () => ({})
  }
})
//使用计算属性计算出头像的src属性
const src = computed(() => {
  //获取本地的数据
  return JSON.parse(localStorage.getItem('userinfo')).avatar
})
</script>

<style lang="scss" scoped>
.chat_my {
  width: 200px;
  // height: 60px;
  display: flex;
  align-items: center;
  margin-top: 5px;
  margin-bottom: 5px;
  margin-left: 440px;
  padding-right: 10px;
  img {
    width: 40px;
    height: 40px;
    margin-left: 10px;
  }
  p {
    color: #333;
    margin-left: 10px;
    line-height: 20px;
    background-color: #fff;
    padding: 5px;
    margin: 10px 0 0 10px;
    border-radius: 5px;
  }
}
</style>
