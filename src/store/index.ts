import { defineStore } from "pinia";
//1.定义容器
//2.使用容器的state
//3.修改state
//4.使用容器的actions
export const useIndexStore = defineStore("index", {
  state: () => {
    return {
      indexone: 2,
    };
  },

  getters: {
    showHot: (state) => {
      return state.indexone;
    },
  },

  actions: {},
});
