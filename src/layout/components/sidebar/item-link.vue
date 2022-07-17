<script setup lang="ts">
type Tprops = {
  to: string;
};
defineProps<Tprops>();
</script>

<template>
  <router-link :to="to">
    <slot></slot>
  </router-link>
</template>

<style lang="scss" scoped></style>
