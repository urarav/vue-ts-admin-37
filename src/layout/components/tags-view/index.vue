<script setup lang="ts">
import { useRoute } from "vue-router";
import { useTagsStore } from "@/store/modules/tags";
import { usePermissionStore } from "@/store/modules/permission.js";
import { Menu } from "./Menu";

const tagsStore = useTagsStore();
const currentRoute = useRoute();
const menuState = reactive<Menu>(new Menu(getCurrentInstance()));

const addTags = () => currentRoute.name && tagsStore.addTags(currentRoute);
const initTags = () => {
  const routes = usePermissionStore().getRoutes;
  const affixRoutes = menuState.filterAffix(routes);
  for (const affixRoute of affixRoutes) {
    affixRoute.name && tagsStore.addTags(affixRoute);
  }
};

onBeforeMount(() => {
  initTags();
  addTags();
});

watch(
  () => menuState.getVisible(),
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
  left: `${menuState.getLeft()}px`,
  top: `${menuState.getTop()}px`,
}));
</script>

<template>
  <div>
    <el-scrollbar style="height: auto">
      <div class="tags">
        <router-link
          v-for="tag in tagsStore.tags"
          :key="tag.path"
          :to="{ path: tag.path, query: tag.query }"
          class="tags-item"
          active-class="tags-item-active"
          @contextmenu.prevent="menuState.openMenu(tag, $event)"
          @click.middle="!menuState.isAffix(tag) && menuState.closeCurrent(tag)"
        >
          <span>{{ tag.meta?.title }}</span>
          <el-icon
            v-show="!tag.meta?.affix"
            @click="menuState.closeCurrent(tag)"
            ><i-ep-close
          /></el-icon>
        </router-link>
      </div>
    </el-scrollbar>

    <el-card
      :style="menuStyle"
      class="tags-menu"
      v-show="menuState.getVisible()"
      shadow="hover"
    >
      <ul>
        <li>刷新</li>
        <li
          @click="menuState.closeCurrent(menuState.getSelectTag())"
          v-show="!menuState.isAffix(menuState.getSelectTag())"
        >
          关闭
        </li>
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

    &-active {
      background-color: #409eff;
      color: #fff;
      &::before {
        width: 8px;
        height: 8px;
        content: "";
        background: #fff;
        border-radius: 50%;
      }
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
