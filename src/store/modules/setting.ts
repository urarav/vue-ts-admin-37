import { defineStore } from "pinia";
import { ISettingsStore } from "~/store";
import store from "..";

export const useSettingStore = defineStore({
  id: "settingStore",
  state(): ISettingsStore {
    return {
      showTagsView: true,
      showSidebarLogo: true,
      fixedHeader: true,
      showThemeSwitch: true,
      showScreenplay: true,
    };
  },
  actions: {
    changeSetting(stateObj: ISettingsStore) {
      this.$state = stateObj;
    },
  },
  getters: {},
});

export function useSettingStoreHook() {
  return useSettingStore(store);
}
