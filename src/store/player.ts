import { defineStore } from "pinia";
import { useSongUrl } from "~/api/api";

//1.定义容器
//2.使用容器的state
//3.修改state
//4.使用容器的actions
export const usePlayerStore = defineStore("player", {
  state: () => {
    return {
      id: 447281461,
      songUrl: "",
    };
  },

  getters: {},

  actions: {
    async getSongUrl() {
      let res = await useSongUrl(this.id);
      this.songUrl = res[0].url;
    },
  },
});
