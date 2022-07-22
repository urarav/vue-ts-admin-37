<script setup lang="ts">
import { usePermissionStore } from "@/store/modules/permission";
import { useApplicationStore } from "@/store/modules/application";
import { RouteRecordRaw } from "vue-router";

const isCollapse = computed<boolean>(
  () => !useApplicationStore().sidebar.opened
);
const routes = computed<Array<RouteRecordRaw>>(
  () => usePermissionStore().routes
);
</script>

<template>
  <el-row>
    <el-col :span="24">
      <el-menu
        active-text-color="#ffd04b"
        background-color="#545c64"
        :unique-opened="true"
        default-active="2"
        text-color="#fff"
        :collapse="isCollapse"
      >
        <SidebarItem
          v-for="routeItem in routes"
          :key="routeItem.path"
          :routeItem="routeItem"
          :base-path="routeItem.path"
          :is-collapse="isCollapse"
        />
      </el-menu>
    </el-col>
  </el-row>
</template>

<style lang="scss" scoped>
.el-menu {
  height: 100vh;
  &:not(.el-menu--collapse) {
    width: 200px;
  }
}
</style>
