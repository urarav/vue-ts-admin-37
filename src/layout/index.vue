<script setup lang="ts">
import { useApplicationStore } from "@/store/modules/application";
import { useSettingStore } from "@/store/modules/setting";

const settingStore = useSettingStore();
const menuWidth = computed<string>(() =>
  !useApplicationStore().sidebar.opened ? "50px" : "200px"
);
</script>

<template>
  <div class="box" :class="{ 'fix-header': settingStore.fixedHeader }">
    <div class="box-aside">
      <sidebar />
    </div>
    <div class="box-main">
      <navbar />
      <tags-view v-if="settingStore.showTagsView" />
      <div class="box-main-content">
        <router-view />
      </div>
    </div>
    <div class="box-right-panel">
      <right-panel><settings /></right-panel>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.box {
  height: 100vh;
  display: flex;
  &-aside {
    width: v-bind(menuWidth);
    transition: ease width 0.15s;
    > .el-row,
    .el-menu {
      height: 100%;
      width: 100%;
    }
  }
  &-main {
    flex: 1;
    display: flex;
    flex-direction: column;
    overflow: auto;
    &-content {
      flex: 1;
    }
  }
  &.fix-header {
    .box-main-content {
      overflow: auto;
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
