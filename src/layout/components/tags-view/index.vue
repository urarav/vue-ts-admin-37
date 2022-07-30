<script setup lang="ts">
const instance = getCurrentInstance();
const menuState = reactive({
  visible: false,
  top: 0,
  left: 0,
  openMenu(e: MouseEvent) {
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
});

watch(
  () => menuState.visible,
  (val) => {
    val && document.addEventListener("click", menuState.closeMenu);
    !val && document.removeEventListener("click", menuState.closeMenu);
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
          v-for="i in 30"
          :key="i"
          class="tags-item"
          @contextmenu.prevent="menuState.openMenu($event)"
        >
          <span>Master</span>
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
        <li>关闭</li>
        <li>关闭其他</li>
        <li>关闭所有</li>
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
