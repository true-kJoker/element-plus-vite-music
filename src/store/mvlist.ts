import { defineStore } from 'pinia'
//1.定义容器
//2.使用容器的state
//3.修改state
//4.使用容器的actions
export const useMvListStore = defineStore('mvList', {
    state: () => {
        return {
            area: '全部',
            type: '全部',
            order: '上升最快',
            limit: 18,
            offset: 0
        }
    },

    getters: {},

    actions: {}
})
