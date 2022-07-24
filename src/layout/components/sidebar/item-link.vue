<script setup lang="ts">
type TProps = {
  to: string;
};
defineProps<TProps>();
</script>

<template>
  <router-link :to="to">
    <slot></slot>
  </router-link>
</template>

<style lang="scss" scoped></style>
