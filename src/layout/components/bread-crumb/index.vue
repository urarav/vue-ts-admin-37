<script setup lang="ts">
import { useRoute, useRouter } from "vue-router";
const route = useRoute();
watch(
  () => route.path,
  () => {
    debugger;
  },
  { immediate: true }
);
</script>

<template>
  <el-breadcrumb separator="/">
    <el-breadcrumb-item :to="{ path: '/' }">homepage</el-breadcrumb-item>
    <el-breadcrumb-item
      ><a href="/">promotion management</a></el-breadcrumb-item
    >
    <el-breadcrumb-item>promotion list</el-breadcrumb-item>
    <el-breadcrumb-item>promotion detail</el-breadcrumb-item>
  </el-breadcrumb>
</template>

<style lang="scss" scoped></style>
