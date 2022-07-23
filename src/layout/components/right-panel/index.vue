<script setup lang="ts">
const drawer = ref<boolean>(false);
</script>

<template>
  <el-icon @click="drawer = true">
    <i-ep-setting />
  </el-icon>
  <el-drawer
    v-model="drawer"
    title="系统布局设置"
    direction="rtl"
    size="20%"
    append-to-body
  >
    <slot></slot>
  </el-drawer>
</template>

<style lang="scss" scoped></style>
