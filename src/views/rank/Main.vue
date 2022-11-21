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
          <i
            v-if="scope.row.hoverFlag"
            class="iconfont icon-play"
            title="播放"
            @click="playMusic(scope.row.id)"
          ></i>
          <div v-if="!scope.row.hoverFlag">
            <span>{{ scope.$index + 1 }}</span>
          </div>
        </template>
      </el-table-column>
      <el-table-column prop="name" label="歌曲" />
      <el-table-column prop="ar[0].name" label="歌手" />
      <el-table-column prop="al.name" label="专辑" />
      <el-table-column label="时长" width="100">
        <template #default="scope">
          <i
            v-if="scope.row.hoverFlag"
            class="mr-3 iconfont icon-add"
            title="添加到列表"
          ></i>
          <i
            v-if="scope.row.hoverFlag"
            class="iconfont icon-collect"
            title="收藏"
          ></i>
          <div v-if="!scope.row.hoverFlag">
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
import { ref } from "vue";
import { useRankStore } from "~/store/rank";
import { usePlayerStore } from "~/store/player";
import { storeToRefs } from "pinia";
import { useFormatDuring } from "~/utils/number";

const store = useRankStore();
const { currentPage, pageSize, rank, songsList } = storeToRefs(store);

const small = ref(false);
const background = ref(false);
const disabled = ref(false);
const handleSizeChange = async (val) => {
  store.pageSize = val;
  store.getPlayListTrackAll();
};
const handleCurrentChange = async (val) => {
  store.currentPage = val;
  store.getPlayListTrackAll();
};

//单元格hover事件
const handleMouseEnter = (row, column, cell, event) => {
  //console.log(row, column, cell, event);
  let Arr = JSON.parse(JSON.stringify(store.songsList));
  for (let index = 0; index < Arr.length; index++) {
    const element = Arr[index];
    if (element.id == row.id) {
      element["hoverFlag"] = true;
    } else {
      element["hoverFlag"] = false;
    }
  }
  store.songsList = JSON.parse(JSON.stringify(Arr));
};
const handleMouseOut = () => {
  for (let index = 0; index < store.songsList.length; index++) {
    const element = store.songsList[index];
    element["hoverFlag"] = false;
  }
};

//播放音乐
const playerStore = usePlayerStore();
const playMusic = (id) => {
  playerStore.id = id;
  playerStore.getSongUrl();
};
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
