<template>
    <el-card v-for="item in topHeader" :class="headerClass" @click="checkoutRank(item.id)">
        {{ item.name }}
    </el-card>
    <el-card v-for="item in rankList" :class="headerClass">{{ item.name }}</el-card>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useTopListDetail } from '~/api/api'
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
})
const checkoutRank = async id => {
    if (id == 'TOP') {
        rankList.value = topList.value
    } else {
        rankList.value = mediaList.value
    }
}
</script>

<style lang="scss" scoped></style>
