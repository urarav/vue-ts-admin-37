<script setup lang="ts">
import { RouteLocationMatched, useRoute, useRouter } from "vue-router";
type TMatchedRouteReactive = {
  breadcrumb: RouteLocationMatched[];
  getRoute: Function;
};

const route = useRoute();
const matchInfo = reactive<TMatchedRouteReactive>({
  breadcrumb: [],
  getRoute() {
    matchInfo.breadcrumb = route.matched.filter((item) => item.meta?.title);
  },
});
watch(
  () => route.path,
  () => matchInfo.getRoute(),
  { immediate: true }
);
</script>

<template>
  <el-breadcrumb separator="/">
    <el-breadcrumb-item
      v-for="item in matchInfo.breadcrumb"
      :key="item.name"
      :to="{ path: item.path }"
    >
      {{ item.meta.title }}
    </el-breadcrumb-item>
  </el-breadcrumb>
</template>

<style lang="scss" scoped></style>
