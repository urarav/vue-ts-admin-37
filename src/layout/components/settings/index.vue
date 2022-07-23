<script setup lang="ts">
import { IsettingsStore } from "~/store";
type TsettingDescItem = {
  label: string;
  value: keyof IsettingsStore;
};
const settingDesc = reactive<Array<TsettingDescItem>>([
  { label: "显示 Tags-View", value: "fixedHeader" },
  { label: "显示侧边栏 Logo", value: "showTagsView" },
  { label: "固定 Header", value: "showSidebarLogo" },
  { label: "显示换肤按钮", value: "showThemeSwitch" },
  { label: "显示全屏按钮", value: "showScreenfull" },
]);

const settingConfig = reactive<IsettingsStore>({
  fixedHeader: true,
  showTagsView: true,
  showSidebarLogo: true,
  showThemeSwitch: true,
  showScreenfull: true,
});
</script>

<template>
  <div class="setting">
    <div class="setting-item" v-for="item in settingDesc" :key="item.value">
      <span>{{ item.label }}</span>
      <el-switch
        v-model="settingConfig[item.value]"
        inline-prompt
        style="--el-switch-on-color: #13ce66; --el-switch-off-color: #ff4949"
        active-text="Y"
        inactive-text="N"
      />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.setting {
    display: flex;
    flex-flow: column nowrap;
    gap: 10px; 
    padding: 10px;
  .setting-item {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
}
</style>
