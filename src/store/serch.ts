import { defineStore } from "pinia";
import { useSearchHotDetail, useSearchSuggest } from "~/api/api";
//1.定义容器
//2.使用容器的state
//3.修改state
//4.使用容器的actions
export const useSerchStore = defineStore("serch", {
  state: () => {
    return {
      keywords: "",
      searchHotDetail: [] as any,
      result: {
        songs: [] as any,
      },
    };
  },

  getters: {},

  actions: {
    async getSearchHotDetail() {
      this.searchHotDetail = await useSearchHotDetail();
    },
    async getSearchSuggest() {
      this.result = await useSearchSuggest(this.keywords);
      this.searchHotDetail = this.result.songs || [];
    },
  },
});
