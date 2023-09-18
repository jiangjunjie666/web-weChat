<template>
  <div class="firend" :class="{ active: modelValue == index }" @click="handlerClick(index)">
    <div class="fir_img">
      <img :src="`http://127.0.0.1:3000/images/${info.avatar}`" />
      <div class="fir_sum">1</div>
    </div>
    <div class="fir_name">
      <h1>{{ info.username }}</h1>
      <h2>好的</h2>
    </div>
  </div>
</template>

<script setup>
//接收父组件的数据
import { defineProps, defineEmits } from 'vue'
const { info } = defineProps({
  info: {
    type: Object,
    default: () => ({})
  },
  modelValue: {
    type: Number,
    default: 0
  },
  index: {
    type: Number,
    default: 0
  }
})
//接收emits
const emits = defineEmits(['update:activeIndex'])
//点击事件
const handlerClick = (index) => {
  emits('update:activeIndex', [index, info.id])
}
</script>

<style lang="scss" scoped>
.firend {
  width: 100%;
  height: 80px;
  background-color: #fff;
  display: flex;
  .fir_img {
    position: relative;
    img {
      margin: 14px 0 0 10px;
      width: 50px;
      height: 50px;
    }
    .fir_sum {
      position: absolute;
      top: 4%;
      left: 48px;
      width: 16px;
      height: 16px;
      border-radius: 50%;
      background-color: red;
      color: #fff;
      text-align: center;
      line-height: 16px;
    }
  }
  .fir_name {
    h1 {
      font-size: 18px;
      font-weight: 500;
      margin: 10px 0 0 10px;
    }
    h2 {
      font-size: 15px;
      font-weight: 500;
      margin: 5px 0 0 10px;
      color: #868181;
    }
  }
}
.active {
  background-color: #d4d0d0;
}
</style>
