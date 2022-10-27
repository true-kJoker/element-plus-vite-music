import { defineStore } from 'pinia'
//1.定义容器
//2.使用容器的state
//3.修改state
//4.使用容器的actions
export const usePlayListStore = defineStore('playList', {
    state: () => {
        return {
            limit: 18,
            offset: 0,
            cat: '',
            playList: []
        }
    },

    getters: {},

    actions: {}
})
