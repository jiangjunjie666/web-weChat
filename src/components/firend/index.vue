<template>
  <div class="firend">
    <div class="fir_img">
      <img src="@/assets/avatar.jpg" />
      <div class="fir_sum">1</div>
    </div>
    <div class="fir_name">
      <h1>你好</h1>
      <h2>好的</h2>
    </div>
  </div>
</template>

<script setup></script>

<style lang="scss" scoped>
.firend {
  width: 100%;
  height: 80px;
  background-color: #e5e4e4;
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
</style>
