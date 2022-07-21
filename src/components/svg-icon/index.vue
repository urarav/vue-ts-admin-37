<script setup lang="ts">
type Tprops = {
  prefix?: string;
  name: string;
  color?: string;
};
const props = withDefaults(defineProps<Tprops>(), {
  prefix: "icon",
  color: "#333",
});

const symbolId = computed<string>(() => `#${props.prefix}-${props.name}`);
</script>

<template>
  <svg class="svg-icon" aria-hidden="true">
    <use :xlink:href="symbolId" :fill="color"></use>
  </svg>
</template>

<style lang="scss" scoped>
.svg-icon {
  max-width: 1em;
  height: 1em;
  fill: currentColor;
  overflow: hidden;
  margin-right: 10px;
}
</style>
