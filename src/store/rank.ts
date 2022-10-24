import { defineStore } from "pinia";
import { useNumberFormat, useFilterTime } from "~/utils/number";
//1.定义容器
//2.使用容器的state
//3.修改state
//4.使用容器的actions
export const useRankStore = defineStore("rank", {
  state: () => {
    return {
      rank: {},
    };
  },

  getters: {},

  actions: {},
});
