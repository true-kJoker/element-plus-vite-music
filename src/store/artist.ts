import { defineStore } from "pinia";
import { useArtistList } from "~/api/api";
//1.定义容器
//2.使用容器的state
//3.修改state
//4.使用容器的actions
export const useArtistStore = defineStore("artist", {
  state: () => {
    return {
      currentPage: 1,
      count: 0,
      pageData: { type: -1, area: -1, initial: "-1", page: 1, limit: 18 },
      artists: [] as any,
    };
  },

  getters: {},

  actions: {
    async getArtistList() {
      let res = await useArtistList(this.pageData);
      this.artists = res;
    },
  },
});
