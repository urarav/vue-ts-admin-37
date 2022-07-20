<script setup lang="ts">
import { useUserStore } from "@/store/modules/user";
const handleCommand = (command: string): void => {
  switch (command) {
    case "0":
      window.open("https://github.com/urarav/vue-ts-admin-37", "_blank");
      break;
    case "1":
      useUserStore().logout();
      break;
    default:
      break;
  }
};
</script>

<template>
  <el-dropdown @command="handleCommand">
    <el-avatar
      src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"
    />
    <template #dropdown>
      <el-dropdown-menu>
        <el-dropdown-item command="0">Github</el-dropdown-item>
        <el-dropdown-item divided command="1">Logout</el-dropdown-item>
      </el-dropdown-menu>
    </template>
  </el-dropdown>
</template>

<style lang="scss" scoped></style>
