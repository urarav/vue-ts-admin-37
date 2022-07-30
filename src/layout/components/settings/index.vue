<script setup lang="ts">
import type { ISettingsStore } from "~/store";
import { useSettingStore } from "@/store/modules/setting";

type TSettingDescItem = {
  label: string;
  value: keyof ISettingsStore;
};
const settingDesc = reactive<Array<TSettingDescItem>>([
  { label: "显示 Tags-View", value: "showTagsView" },
  { label: "显示侧边栏 Logo", value: "showSidebarLogo" },
  { label: "固定 Header", value: "fixedHeader" },
  { label: "显示换肤按钮", value: "showThemeSwitch" },
  { label: "显示全屏按钮", value: "showScreenplay" },
]);

const settingStore = useSettingStore();

const settingConfig = reactive<ISettingsStore>({
  showTagsView: settingStore.showTagsView,
  showSidebarLogo: settingStore.showSidebarLogo,
  fixedHeader: settingStore.fixedHeader,
  showThemeSwitch: settingStore.showThemeSwitch,
  showScreenplay: settingStore.showScreenplay,
});

watchEffect(() => {
  const {
    fixedHeader,
    showTagsView,
    showSidebarLogo,
    showThemeSwitch,
    showScreenplay,
  } = settingConfig;
  useSettingStore().changeSetting({
    fixedHeader,
    showTagsView,
    showSidebarLogo,
    showThemeSwitch,
    showScreenplay,
  });
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

  &-item {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
}
</style>
