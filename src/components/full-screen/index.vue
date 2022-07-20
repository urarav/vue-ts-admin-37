<script setup lang="ts">
import screenfull from "screenfull";
const handleClick = () => {
  if (!screenfull.isEnabled) {
    ElMessage.warning("你的浏览器无法工作！");
    return;
  }
  screenfull.toggle();
};
</script>

<template>
  <div @click="handleClick">
    <el-tooltip content="全屏" placement="bottom" effect="light">
      <el-icon><i-ep-full-screen /></el-icon>
    </el-tooltip>
  </div>
</template>

<style lang="scss" scoped></style>
