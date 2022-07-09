<script setup lang="ts"></script>

<template>
  <div class="box">
    <div class="box-aside"></div>
    <div class="box-main">
      <div class="box-navbar"></div>
      <div class="box-content"></div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.box {
  min-height: 100vh;
  display: flex;
  &-aside {
    width: 200px;
    background-color: black;
  }
  &-main {
    flex: 1;
    display: flex;
    flex-direction: column;
    & > .box-navbar{
        height: 50px;
        background-color: aquamarine;
    }
    & > .box-content{
        flex: 1;
        background-color: aqua;
    }
  }
}
</style>
