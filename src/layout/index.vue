<script setup lang="ts">
import { layoutMode } from "@/enums/layoutMode";
import { useApplicationStore } from "@/store/modules/application";
import { useSettingStore } from "@/store/modules/setting";

const clsObj = computed(() => ({
  [layoutMode._MODE_HAM]: useSettingStore().layoutSwitch,
}));
const menuWidth = computed<string>(() =>
  !useApplicationStore().sidebar.opened ? "50px" : "200px"
);
</script>

<template>
  <div class="box" :class="clsObj">
    <div class="box-aside">
      <sidebar />
    </div>
    <!-- <div class="box-main"> -->
    <div class="box-navbar">
      <navbar />
    </div>
    <div class="box-content">
      <router-view />
    </div>
    <!-- </div> -->
    <div class="box-right-panel">
      <right-panel><settings /></right-panel>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.box {
  height: 100vh;
  display: grid;
  grid-template-columns: auto 1fr;
  grid-template-rows: auto 1fr;
  &-aside {
    grid-row-start: 1;
    grid-row-end: 3;
    width: v-bind(menuWidth);
    transition: ease width 0.15s;
    > .el-row,
    .el-menu {
      height: 100%;
      width: 100%;
    }
  }
  &-navbar {
    border-bottom: 1px solid rgba(151, 168, 190, 0.25);
  }
  &-content {
    overflow: auto;
  }
  &.header-aside-main {
    .box-navbar {
      grid-column-start: 1;
      grid-column-end: 3;
    }
    .box-aside {
      grid-row-start: 2;
      grid-row-end: 3;
    }
  }

  &-right-panel {
    width: 50px;
    height: 50px;
    display: flex;
    align-items: center;
    justify-content: center;
    color: aliceblue;
    background-color: #545c64;
    border-radius: 6px 0 0 6px;
    position: fixed;
    right: 0;
    top: 50%;
    transform: translateY(-50%);
    :deep(.el-icon) {
      height: 100%;
      width: 100%;
      font-size: 24px;
      cursor: pointer;
    }
  }
}
</style>
