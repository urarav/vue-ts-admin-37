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
  height: 100vh;
  display: flex;
  &-main {
    flex: 1;
    display: flex;
    flex-direction: column;
    > .box-navbar {
      border-bottom: 1px solid rgba(151, 168, 190, 0.25);
    }
    > .box-content {
      flex: 1;
      overflow: auto;
    }
  }
}
</style>
