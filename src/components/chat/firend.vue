<template>
  <div class="chat_fir">
    <img src="@/assets/avatar.jpg" alt="" />
    <p>hello world</p>
  </div>
</template>

<script setup></script>

<style lang="scss" scoped>
.chat_fir {
  width: 200px;
  height: 60px;
  // background-color: pink;
  display: flex;
  img {
    width: 40px;
    height: 40px;
    margin-left: 10px;
  }
  p {
    height: 30px;
    background-color: #fff;
    padding: 5px;
    margin: 10px 0 0 10px;
    border-radius: 5px;
  }
}
</style>
