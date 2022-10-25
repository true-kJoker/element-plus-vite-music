<template>
    <el-card>
        <ul v-for="(item, i) in topCat" :key="i">
            <h1>{{ item }}</h1>
            <li v-for="cat in playListCat">{{ cat.name }}</li>
        </ul>
    </el-card>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { usePlayListCatList } from '~/api/api'

let topCat = ref({})
let playListCat = ref([])
onMounted(async () => {
    const res = await usePlayListCatList()
    console.log(res)
    topCat.value = res.categories
    playListCat.value = res.sub
})
</script>

<style lang="scss" scoped></style>
