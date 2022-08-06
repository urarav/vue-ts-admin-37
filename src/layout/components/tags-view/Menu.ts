import { useTagsStore } from "@/store/modules/tags";
import { RouteRecordRaw } from "vue-router";
import type { ITagsItem } from "~/store.js";
import path from "path";

const tagsStore = useTagsStore();

export class Menu {
  private visible: boolean;
  private top: number;
  private left: number;
  private selectTag: object;
  private instance: any;
  constructor(instance: any) {
    this.visible = false;
    this.top = 0;
    this.left = 0;
    this.selectTag = new Object();
    this.instance = instance;
  }
  public getVisible() {
    return this.visible;
  }
  public getTop() {
    return this.top;
  }
  public getLeft() {
    return this.left;
  }
  public getSelectTag() {
    return this.selectTag;
  }

  public openMenu(tag: ITagsItem, e: MouseEvent): void {
    this.selectTag = tag;
    const { proxy } = this.instance,
      { clientX, clientY } = e;
    const offsetWidth = proxy.$el.offsetWidth;
    const offsetLeft = proxy.$el.getBoundingClientRect().left;
    const thresholdX = offsetWidth + offsetLeft - 80;
    if (clientX > thresholdX) {
      this.left = thresholdX;
    } else {
      this.left = clientX;
    }
    this.visible = true;
    this.top = clientY;
  }
  public isAffix(tag: ITagsItem): boolean {
    return !!tag.meta?.affix;
  }
  public closeMenu(): void {
    this.visible = false;
  }
  public closeAll(): void {
    tagsStore.closeAll();
  }
  public closeOthers(): void {
    tagsStore.closeOthers(this.selectTag);
  }
  public closeCurrent(tag: ITagsItem): void {
    tagsStore.closeCurrent(tag);
  }
  public filterAffix(routes: RouteRecordRaw[], basePath = "/") {
    let resultArr: Array<ITagsItem> = [];
    for (const route of routes) {
      if (route.children) {
        const childArr = this.filterAffix(route.children, route.path);
        childArr.length && (resultArr = resultArr.concat(childArr));
      }
      if (route.meta?.affix) {
        const _path = path.resolve(basePath, route.path);
        resultArr.push({
          path: _path,
          meta: { ...route.meta },
          name: route.name,
        });
      }
    }
    return resultArr;
  }
}
