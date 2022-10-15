<script setup lang="ts">
import path from "path";
import { RouteRecordRaw } from "vue-router";
import ItemIcon from "@/layout/components/sidebar/item-icon";

type TProps = {
  routeItem: RouteRecordRaw;
  basePath: string;
  isCollapse: boolean;
};
const { routeItem, basePath, isCollapse } = defineProps<TProps>();

const clsObj = computed(() => ({ "is-collapse": isCollapse }));
const childNum = computed<number>(() => routeItem.children?.length ?? 0);
/**
 * 判断子节点数量：
 * 1：多于一个子节点时，返回null走嵌套子菜单
 * 2：等于一个子节点时，返回这个子节点
 * 3：没有子节点时，返回本身（path需置空，否则路径会重复拼接）
 */
const theOnlyOneChild = computed<RouteRecordRaw | null>(() =>
  childNum.value > 1
    ? null
    : childNum.value === 1
    ? routeItem.children![0]
    : { ...routeItem, path: "" }
);

const resolvePath = (routePath: string): string =>
  path.resolve(basePath, routePath);
</script>

<template>
  <!-- 无嵌套子菜单：判断有子节点且子节点无子节点 -->
  <template v-if="theOnlyOneChild && !theOnlyOneChild.children">
    <item-link
      v-if="theOnlyOneChild.meta && !theOnlyOneChild.meta.hidden"
      :to="resolvePath(theOnlyOneChild.path)"
      :class="clsObj"
    >
      <el-menu-item :index="resolvePath(theOnlyOneChild.path)">
        <item-icon :meta="theOnlyOneChild.meta" />
        <template v-if="theOnlyOneChild.meta.title" #title>
          <span>{{ theOnlyOneChild.meta.title }}</span>
        </template>
      </el-menu-item>
    </item-link>
  </template>
  <!-- 嵌套子菜单 -->
  <el-sub-menu :index="resolvePath(routeItem.path)" v-else>
    <template v-if="routeItem.meta && routeItem.meta.title" #title>
      <item-icon :meta="routeItem.meta" />
      <span>{{routeItem.meta!.title}}</span>
    </template>
    <sidebar-item
      v-for="child in routeItem.children"
      :key="child.path"
      :routeItem="child"
      :base-path="resolvePath(child.path)"
      :is-collapse="isCollapse"
    />
  </el-sub-menu>
</template>

<style lang="scss" scoped>
.is-collapse {
  .svg-icon {
    margin-right: 0;
  }
}
</style>
