import { defineStore } from "pinia";
import { useTopListDetail, usePlayListTrackAll } from "~/api/api";
//1.定义容器
//2.使用容器的state
//3.修改state
//4.使用容器的actions
export const useRankStore = defineStore("rank", {
  state: () => {
    return {
      currentPage: 1,
      pageSize: 10,
      rank: {
        id: 19723756,
      },
      songsList: [] as any[],
      topList: [] as any[],
      mediaList: [] as any[],
      rankList: [] as any[],
    };
  },

  getters: {},

  actions: {
    async getTopListDetail() {
      if (this.rankList.length == 0) {
        const res = await useTopListDetail();
        res.forEach((item) => {
          if (item.ToplistType) {
            this.topList.push(item);
          } else {
            this.mediaList.push(item);
          }
        });
        this.rank = this.topList[0];
        this.rankList = this.topList;
      }
    },
    async getPlayListTrackAll() {
      const res = await usePlayListTrackAll(
        this.rank.id,
        this.pageSize,
        (this.currentPage - 1) * this.pageSize
      );
      this.songsList = res;
    },
  },
});
