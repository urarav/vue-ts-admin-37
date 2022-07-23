<script setup lang="ts">
const drawer = ref<boolean>(false);
</script>

<template>
  <el-icon @click="drawer = true">
    <i-ep-setting />
  </el-icon>
  <el-drawer
    v-model="drawer"
    title="I am the title"
    direction="rtl"
    append-to-body
  >
    <span>Hi, there!</span>
  </el-drawer>
</template>

<style lang="scss" scoped></style>
