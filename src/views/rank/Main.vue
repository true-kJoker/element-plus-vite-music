<template>
    <el-card>
        <el-table :data="songsList">
            <el-table-column prop="name" label="Name" />
        </el-table>
        <el-pagination
            v-model:currentPage="currentPage"
            v-model:page-size="pageSize"
            :page-sizes="[10, 20, 50, 100]"
            :small="small"
            :disabled="disabled"
            :background="background"
            layout="total,sizes, prev, pager, next"
            :total="rank.trackCount"
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
        />
    </el-card>
</template>

<script setup>
import { ref } from 'vue'
import { useRankStore } from '~/store/rank'
import { storeToRefs } from 'pinia'
import { usePlayListTrackAll } from '~/api/api'

const store = useRankStore()
const { rank, songsList } = storeToRefs(store)

const currentPage = ref(1)
const pageSize = ref(10)
const small = ref(false)
const background = ref(false)
const disabled = ref(false)
const handleSizeChange = async val => {
    const res = await usePlayListTrackAll(rank.value.id, val, currentPage.value)
    store.songsList = res
}
const handleCurrentChange = async val => {
    const res = await usePlayListTrackAll(rank.value.id, pageSize.value, (val - 1) * pageSize.value)
    store.songsList = res
}
</script>

<style lang="scss" scoped></style>
