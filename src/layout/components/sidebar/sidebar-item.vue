<script setup lang="ts">
import { RouteRecordRaw } from "vue-router";

type Tprops = {
  route: RouteRecordRaw;
};
const { route } = defineProps<Tprops>();

const childNum = computed<number>(() => route.children?.length ?? 0);
const theOnlyOneChild = computed<RouteRecordRaw | null>(() =>
  childNum.value > 1
    ? null
    : childNum.value === 1
    ? route.children![0]
    : { ...route }
);
</script>

<template>
  <!-- 无嵌套子菜单：判断有子节点且子节点无子节点 -->
  <template v-if="theOnlyOneChild && !theOnlyOneChild.children">
    <el-menu-item v-if="theOnlyOneChild.meta" :index="theOnlyOneChild.path">
      <template v-if="theOnlyOneChild.meta.title" #title>{{
        theOnlyOneChild.meta.title
      }}</template>
    </el-menu-item>
  </template>
  <!-- 嵌套子菜单 -->
  <el-sub-menu index="222" v-else>
    <template v-if="route.meta && route.meta.title" #title>{{
      route.meta!.title
    }}</template>
    <SidebarItem
      v-for="child in route.children"
      :key="route.path"
      :route="child"
    />
  </el-sub-menu>
</template>

<style lang="scss" scoped></style>
