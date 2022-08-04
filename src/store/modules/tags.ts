import { defineStore } from "pinia";
import type { ITagsState, ITagsItem } from "~/store";

export const useTagsStore = defineStore({
  id: "tagsStore",
  state(): ITagsState {
    return {
      tags: [],
    };
  },
  actions: {
    addTags(tag: ITagsItem) {
      this.tags.push(Object.assign({}, tag));
    },
    closeAll() {
      this.tags = this.tags.filter((item) => item.meta?.affix);
    },
    closeOthers(tag: ITagsItem) {
      this.tags = this.tags.filter(
        (item) => item.path === tag.path || item.meta?.affix
      );
    },
    closeCurrent(tag: ITagsItem) {
      const idx = this.tags.findIndex((item) => item.path === tag.path);
      this.tags.splice(idx, 1);
    },
  },
  getters: {
    getTags(): ITagsItem[] {
      return this.tags;
    },
  },
});
