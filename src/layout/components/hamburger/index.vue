<script setup lang="ts">
type Tprops = {
  isActive: boolean;
};
const emits = defineEmits(["toggleCollapse"]);
defineProps<Tprops>();
const toogleCollapse = (): void => emits("toggleCollapse");
</script>

<template>
  <el-icon @click="toogleCollapse">
    <i-ep-expand v-if="isActive" />
    <i-ep-fold v-else />
  </el-icon>
</template>

<style lang="scss" scoped></style>
