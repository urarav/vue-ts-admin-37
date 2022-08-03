import { defineStore } from "pinia";
import { ISettingsState } from "~/store";
import store from "..";

export const useSettingStore = defineStore({
  id: "settingStore",
  state(): ISettingsState {
    return {
      showTagsView: true,
      showSidebarLogo: true,
      fixedHeader: true,
      showThemeSwitch: true,
      showScreenplay: true,
    };
  },
  actions: {
    changeSetting(stateObj: ISettingsState) {
      this.$state = stateObj;
    },
  },
  getters: {},
});

export function useSettingStoreHook() {
  return useSettingStore(store);
}
