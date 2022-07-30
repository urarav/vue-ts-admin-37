<script setup lang="ts"></script>

<template>
  <div class="tags">
    <div v-for="i in 10" :key="i" class="tags-item">
      <span>Master</span>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.tags {
  display: flex;
  padding: 5px 10px;
  align-items: center;
  border-bottom: 1px solid rgba(151, 168, 190, 0.25);
  box-shadow: 0 3px 3px rgba(0, 0, 0, 0.07);
  gap: 5px;
  &-item {
    border-radius: 4px;
    height: 26px;
    line-height: 26px;
    background: aqua;
  }
}
</style>
