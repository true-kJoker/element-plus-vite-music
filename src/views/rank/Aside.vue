<template>
    <el-card v-for="item in topHeader" :class="headerClass" @click="checkoutRank(item.id)">
        {{ item.name }}
    </el-card>
    <el-card v-for="item in rankList" :class="headerClass" @click="checkRank(item)">
        <el-image
            :src="item.coverImgUrl"
            style="width: 45px; height: 45px"
            class="float-left mr-4 rounded-lg"
        ></el-image>
        <span class="block text-xl text-purple-600 truncate">{{ item.name }}</span>
        <span class="block">{{ item.updateFrequency }}</span>
    </el-card>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useTopListDetail, usePlayListTrackAll } from '~/api/api'
import { useRankStore } from '~/store/rank'
import { storeToRefs } from 'pinia'

const store = useRankStore()
const { rank } = storeToRefs(store)
const topHeader = ref([
    { id: 'TOP', name: '特色榜' },
    { id: 'Medio', name: '媒体榜' }
])
const headerClass = ref(
    'w-45% inline-block ml-4 rounded-lg cursor-pointer text-center hover:bg-pink-500'
)
const topList = ref([])
const mediaList = ref([])
const rankList = ref([])
onMounted(async () => {
    const res = await useTopListDetail()
    res.forEach(item => {
        if (item.ToplistType) {
            topList.value.push(item)
        } else {
            mediaList.value.push(item)
        }
    })
    rankList.value = topList.value
    store.rank = rankList.value[0]
    const songsList = await usePlayListTrackAll(rankList.value[0].id, 10)
    store.songsList = songsList
})
const checkoutRank = async id => {
    if (id == 'TOP') {
        rankList.value = topList.value
    } else {
        rankList.value = mediaList.value
    }
}
const checkRank = async item => {
    store.rank = item
    const res = await usePlayListTrackAll(item.id, 10)
    store.songsList = res
}
</script>

<style lang="scss" scoped></style>
