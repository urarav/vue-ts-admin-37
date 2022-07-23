<script setup lang="ts">
import { useApplicationStore } from "@/store/modules/application";
import { useUserStore } from "@/store/modules/user";

const applicationStore = useApplicationStore();
const logout = (): void => useUserStore().logout();
const toggleCollapse = (): void => applicationStore.toggleSidebar();
const isActive = computed<boolean>(() => applicationStore.sidebar.opened);
</script>

<template>
  <div class="nav">
    <div class="nav-left">
      <hamburger @toggleCollapse="toggleCollapse" :is-active="isActive" />
      <div class="bread-crumb">
        <bread-crumb />
      </div>
    </div>
    <div class="nav-right">
      <full-screen />
      <el-icon><i-ep-magicStick /></el-icon>
      <dropdown @logout="logout" />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.nav {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 5px 10px;
  font-size: 20px;
  &-left {
    display: flex;
    gap: 10px;
    align-items: center;
    > .bread-crumb {
      color: #97a8be;
      font-size: 14px;
      cursor: pointer;
    }
  }
  &-right {
    display: flex;
    gap: 10px;
    align-items: center;
    :deep(span, img) {
      width: 34px;
      height: 34px;
    }
  }
}
</style>
