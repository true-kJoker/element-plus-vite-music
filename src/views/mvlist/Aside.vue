<template>
    <el-card>
        <ul v-for="(item, i) in topCat" :key="i" class="flex">
            <span class="text-xl font-semibold">{{ item }}</span>
            <li v-for="cat in catList[i]">
                <el-button
                    link
                    :class="{
                        'active-rank':
                            (store.order === cat && i === '0') ||
                            (store.area === cat && i === '1') ||
                            (store.type === cat && i === '2')
                    }"
                    class="ml-5"
                    @click="catClick(cat, i)"
                >
                    {{ cat }}
                </el-button>
            </li>
        </ul>
    </el-card>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import { useMvListStore } from '~/store/mvlist'

const topCat = ref({ 0: '排序', 1: '区域', 2: '类型' })
const catList = ref([
    { 0: '上升最快', 1: '最热', 2: '最新' },
    { 0: '全部', 1: '内地', 2: '港台', 3: '欧美', 4: '日本', 5: '韩国' },
    { 0: '全部', 1: '官方版', 3: '现场版', 4: '网易出品' }
])
const store = useMvListStore()
const catClick = (cat, i) => {
    console.log(cat)
    if (i == 0) {
        store.order = cat
        store.offset = 0
        store.currentPage = 1
        store.getMvAll()
    } else if (i == 1) {
        store.area = cat
        store.offset = 0
        store.currentPage = 1
        store.getMvAll()
    } else if (i == 2) {
        store.type = cat
        store.offset = 0
        store.currentPage = 1
        store.getMvAll()
    }
}
onMounted(() => {
    store.getMvAll()
})
</script>

<style lang="less" scoped>
.active-rank {
    background: linear-gradient(135deg, #ffffff 20%, #ffb08e 100%);
}
</style>
