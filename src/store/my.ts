import { defineStore } from 'pinia'
import { useArtistSublist, useMvSublist, useUserSubcount, useUserPlaylist } from '~/api/api'
//1.定义容器
//2.使用容器的state
//3.修改state
//4.使用容器的actions
export const useMyStore = defineStore('my', {
    state: () => {
        return {
            artistSublis: {},
            mvSublis: {},
            userSubcount: {},
            userPlaylist: {}
        }
    },

    getters: {},

    actions: {
        async getArtistSublist() {
            this.artistSublis = await useArtistSublist()
        },
        async getMvsublist() {
            this.mvSublis = await useMvSublist()
        },
        async getUserSubcount() {
            this.userSubcount = await useUserSubcount()
        },
        async getUserPlaylist() {
            this.userPlaylist = await useUserPlaylist()
        }
    }
})
