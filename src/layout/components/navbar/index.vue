<script setup lang="ts"></script>

<template>
  <div class="nav">
    <div class="nav-left">
      <el-icon><i-ep-expand /></el-icon>
      <div class="bread-crumb">
        <span>首页/仪表盘/监控</span>
      </div>
    </div>
    <div class="nav-right">
      <full-screen />
      <el-icon><i-ep-magicStick /></el-icon>
      <dropdown />
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
