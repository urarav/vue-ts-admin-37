<script setup lang="ts">
import { RouteRecordRaw, useRoute } from "vue-router";
import { useTagsStore } from "@/store/modules/tags";
import type { ITagsItem } from "~/store.js";
import { usePermissionStore } from "@/store/modules/permission.js";
import path from "path";

const instance = getCurrentInstance();
const tagsStore = useTagsStore();
const currentRoute = useRoute();
const menuState = reactive({
  visible: false,
  top: 0,
  left: 0,
  selectTag: new Object(),
  openMenu(tag: ITagsItem, e: MouseEvent) {
    menuState.selectTag = tag;
    const { proxy } = instance as any,
      { clientX, clientY } = e;
    const offsetWidth = proxy.$el.offsetWidth;
    const offsetLeft = proxy.$el.getBoundingClientRect().left;
    const thresholdX = offsetWidth + offsetLeft - 80;
    if (clientX > thresholdX) {
      menuState.left = thresholdX;
    } else {
      menuState.left = clientX;
    }
    menuState.visible = true;
    menuState.top = clientY;
  },
  closeMenu() {
    menuState.visible = false;
  },
  closeAll() {
    tagsStore.closeAll();
  },
  closeOthers() {
    tagsStore.closeOthers(menuState.selectTag);
  },
  closeCurrent() {
    tagsStore.closeCurrent(menuState.selectTag);
  },
});

function filterAffix(routes: RouteRecordRaw[], basePath = "/") {
  const resultArr: Array<ITagsItem> = [];
  for (const route of routes) {
    if (route.children) {
      const childArr = filterAffix(route.children, route.path);
      childArr.length && resultArr.concat(childArr);
    }
    if (route.meta?.affix) {
      const _path = path.resolve(basePath, route.path);
      resultArr.push({
        path: _path,
        fullPath: _path,
        meta: { ...route.meta },
        name: route.name,
      });
    }
  }
  return resultArr;
}
const addTags = () => currentRoute.name && tagsStore.addTags(currentRoute);
const initTags = () => {
  const routes = usePermissionStore().getRoutes;
  const affixRoutes = filterAffix(routes);
};

onBeforeMount(() => {
  initTags();
  addTags();
});

watch(
  () => menuState.visible,
  (val) => {
    val && document.addEventListener("click", menuState.closeMenu);
    !val && document.removeEventListener("click", menuState.closeMenu);
  }
);

watch(
  () => currentRoute.name,
  () => {
    addTags();
  }
);

const menuStyle = computed(() => ({
  left: `${menuState.left}px`,
  top: `${menuState.top}px`,
}));
</script>

<template>
  <div>
    <el-scrollbar style="height: auto">
      <div class="tags">
        <div
          v-for="tag in tagsStore.tags"
          :key="tag.path"
          class="tags-item"
          @contextmenu.prevent="menuState.openMenu(tag, $event)"
        >
          <span>{{ tag.meta?.title }}</span>
          <el-icon><i-ep-close /></el-icon>
        </div>
      </div>
    </el-scrollbar>

    <el-card
      :style="menuStyle"
      class="tags-menu"
      v-show="menuState.visible"
      shadow="hover"
    >
      <ul>
        <li>刷新</li>
        <li @click="menuState.closeCurrent">关闭</li>
        <li @click="menuState.closeOthers">关闭其他</li>
        <li @click="menuState.closeAll">关闭所有</li>
      </ul>
    </el-card>
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
    padding: 0 8px;
    border-radius: 2px;
    height: 26px;
    display: flex;
    align-items: center;
    gap: 5px;
    border: 1px solid #d8dce5;
    &::before {
      width: 8px;
      height: 8px;
      content: "";
      background: #000;
      border-radius: 50%;
    }
  }
  &-menu {
    position: absolute;
    z-index: 1;
    width: 80px;
    > :deep(.el-card__body) {
      padding: 0;
      ul,
      li {
        list-style-type: none;
        padding: 0;
        margin: 0;
      }
      li {
        line-height: 25px;
        text-indent: 10px;
        cursor: pointer;
        transition: all 0.5s ease-in-out;
        &:hover {
          background-color: rgba(0, 0, 0, 0.07);
        }
      }
    }
  }
}
</style>
