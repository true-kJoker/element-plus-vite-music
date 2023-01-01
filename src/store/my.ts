import { defineStore } from "pinia";
import {
  useArtistSublist,
  useMvSublist,
  useUserSubcount,
  useUserPlaylist,
  usePlayListTrackAll,
  usePlaylistDetailDynamic,
} from "~/api/api";
//1.定义容器
//2.使用容器的state
//3.修改state
//4.使用容器的actions
export const useMyStore = defineStore("my", {
  state: () => {
    return {
      artistSublis: [] as any,
      mvSublis: [] as any,
      userSubcount: [] as any,
      userPlaylist: [],
      id: 2291916786,
      currentPage: 1,
      pageSize: 10,
      songsList: [] as any[],
      playList: [] as any[],
    };
  },

  getters: {},

  actions: {
    async getArtistSublist() {
      this.artistSublis = await useArtistSublist();
    },
    async getMvsublist() {
      this.mvSublis = await useMvSublist();
    },
    async getUserSubcount() {
      this.userSubcount = await useUserSubcount();
    },
    async getUserPlaylist() {
      this.userPlaylist = await useUserPlaylist(1503855185);
      this.playList = this.userPlaylist[0];
    },
    async getPlayListTrackAll() {
      this.songsList = await usePlayListTrackAll(
        this.id,
        this.pageSize,
        (this.currentPage - 1) * this.pageSize
      );
    },
  },
});
