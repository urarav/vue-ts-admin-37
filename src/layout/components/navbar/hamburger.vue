<script setup lang="ts">
type TProps = {
  isActive: boolean;
};
const emits = defineEmits(["toggleCollapse"]);
defineProps<TProps>();
const toggleCollapse = (): void => emits("toggleCollapse");
</script>

<template>
  <el-icon @click="toggleCollapse">
    <i-ep-expand v-if="isActive" />
    <i-ep-fold v-else />
  </el-icon>
</template>

<style lang="scss" scoped></style>
