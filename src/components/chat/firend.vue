<template>
  <div class="chat_fir">
    <img src="@/assets/avatar.jpg" alt="" />
    <p>{{ message.chat_message }}</p>
  </div>
</template>

<script setup>
import { defineProps } from 'vue'
const props = defineProps({
  message: {
    type: Object,
    default: () => ({})
  }
})
</script>

<style lang="scss" scoped>
.chat_fir {
  width: 200px;
  // height: 60px;
  // background-color: pink;
  align-items: center;
  margin-top: 5px;
  margin-bottom: 5px;
  display: flex;
  img {
    width: 40px;
    height: 40px;
    margin-left: 10px;
  }
  p {
    // height: 30px;
    line-height: 20px;
    background-color: #fff;
    padding: 5px;
    margin: 10px 0 0 10px;
    border-radius: 5px;
  }
}
</style>
