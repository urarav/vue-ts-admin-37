<script setup lang="ts">
import { usePermissionStore } from "@/store/modules/permission";

const routes = computed(() => usePermissionStore().routes);

const handleOpen = (key: string, keyPath: string[]) => {
  console.log(key, keyPath)
}
const handleClose = (key: string, keyPath: string[]) => {
  console.log(key, keyPath)
}
</script>

<template>
  <el-row>
    <el-col :span="24">
      <el-menu
        active-text-color="#ffd04b"
        background-color="#545c64"
        default-active="2"
        text-color="#fff"
        @open="handleOpen"
        @close="handleClose"
      >
        <SidebarItem
          v-for="routeItem in routes"
          :key="routeItem.path"
          :routeItem="routeItem"
          :base-path="routeItem.path"
        />
      </el-menu>
    </el-col>
  </el-row>
</template>

<style lang="scss" scoped>
.el-menu{
  min-height: 100vh;
}
</style>
