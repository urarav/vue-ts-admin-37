<script setup lang="ts">
import * as ElementPlusIconsVue from "@element-plus/icons-vue";
type Tprops = {
  name: string;
};
defineProps<Tprops>();
</script>

<template>
  <el-icon class="svg-icon">
    <component
      :is="ElementPlusIconsVue[name as keyof typeof ElementPlusIconsVue]"
    ></component>
  </el-icon>
</template>

<style scoped>
.svg-icon {
  margin-left: -2px;
}
</style>
