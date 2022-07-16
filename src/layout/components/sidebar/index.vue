<script setup lang="ts">
import { usePermissionStore } from "@/store/modules/permission";

const routes = computed(() => usePermissionStore().routes);
</script>

<template>
  <el-row>
    <el-col :span="24">
      <el-menu
        active-text-color="#ffd04b"
        background-color="#545c64"
        default-active="2"
        text-color="#fff"
      >
        <SidebarItem
          v-for="route in routes"
          :key="route.path"
          :route="route"
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
