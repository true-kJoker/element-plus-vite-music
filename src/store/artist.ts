import { defineStore } from "pinia";
import { useArtistList } from "~/api/api";
//1.定义容器
//2.使用容器的state
//3.修改state
//4.使用容器的actions
export const useArtistStore = defineStore("artist", {
  state: () => {
    return {
      pageData: { type: -1, area: -1, initial: "a", page: 1, limit: 30 },
    };
  },

  getters: {},

  actions: {
    async getArtistList() {
      let res = await useArtistList(this.pageData);
      console.log(res);
    },
  },
});
