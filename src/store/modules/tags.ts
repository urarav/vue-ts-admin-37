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
      debugger;
      this.tags.push(Object.assign({}, tag));
    },
  },
  getters: {
    tagsView(): ITagsItem[] {
      return this.tags;
    },
  },
});
