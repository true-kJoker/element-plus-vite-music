<template>
    <el-card>
        <el-table
            :data="songsList"
            @cell-mouse-enter="handleMouseEnter"
            @cell-mouse-leave="handleMouseOut"
            stripe
            :row-style="{ height: '60px' }"
        >
            <el-table-column type="index" label="序号" width="100">
                <template #default="scope">
                    <i v-if="hoverOn" class="iconfont icon-play" title="播放"></i>
                    <div v-if="!hoverOn">
                        <span>{{ scope.$index + 1 }}</span>
                    </div>
                </template>
            </el-table-column>
            <el-table-column prop="name" label="歌曲" />
            <el-table-column prop="ar[0].name" label="歌手" />
            <el-table-column prop="al.name" label="专辑" />
            <el-table-column label="时长" width="100">
                <template #default="scope">
                    <i v-if="hoverOn" class="mr-3 iconfont icon-add" title="添加到列表"></i>
                    <i v-if="hoverOn" class="iconfont icon-collect" title="收藏"></i>
                    <div v-if="!hoverOn">
                        <span>{{ useFormatDuring(scope.row.dt / 1000) }}</span>
                    </div>
                </template>
            </el-table-column>
        </el-table>
        <el-pagination
            v-model:currentPage="currentPage"
            v-model:page-size="pageSize"
            :page-sizes="[10, 20, 50, 100]"
            :small="small"
            :disabled="disabled"
            :background="background"
            layout="total,sizes, prev, pager, next"
            :total="rank.trackCount || 100"
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
import { useFormatDuring } from '~/utils/number'

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

//单元格hover事件
const hoverOn = ref(false)
const handleMouseEnter = () => {
    hoverOn.value = true
}
const handleMouseOut = () => {
    hoverOn.value = false
}
</script>

<style lang="less" scoped>
.iconfont {
    font-size: 22px;
    cursor: pointer;
    vertical-align: middle;

    &:hover {
        color: var(--color-text-height);
    }
}
</style>
