<script setup lang="ts">
import Sidebar from "./components/sidebar/index.vue";
import Navbar from "./components/navbar/index.vue";
</script>

<template>
  <div class="box">
    <div class="box-aside">
      <sidebar />
    </div>
    <div class="box-main">
      <div class="box-navbar">
        <navbar />
      </div>
      <div class="box-content">
        <router-view />
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.box {
  min-height: 100vh;
  display: flex;
  &-aside {
    width: 200px;
  }
  &-main {
    flex: 1;
    display: flex;
    flex-direction: column;
    > .box-navbar {
      height: 50px;
      background-color: aquamarine;
    }
    > .box-content {
      flex: 1;
      background-color: aqua;
    }
  }
}
</style>
