<template>
  <el-card>
    <div
      class="my-5 inline-block"
      v-for="(item, i) in playList.playlists"
      :key="i"
    >
      <el-image
        :src="item.coverImgUrl"
        style="width: 220px; height: 220px"
        class="mr-8 rounded-md"
      >
      </el-image>
      <span class="block break-normal">{{ item.name }}</span>
    </div>
    <el-pagination
      v-model:currentPage="currentPage"
      v-model:page-size="pageSize"
      :page-sizes="[20, 50, 100, 200]"
      :small="small"
      :disabled="disabled"
      :background="background"
      layout="total,sizes, prev, pager, next"
      :total="playList.total"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
    />
  </el-card>
</template>

<script setup>
import { ref } from "vue";
import { usePlayListStore } from "~/store/playList";
import { storeToRefs } from "pinia";
import { useTopPlaylist } from "~/api/api";

const store = usePlayListStore();
const { playList } = storeToRefs(store);
const currentPage = ref(1);
const pageSize = ref(20);
const small = ref(false);
const background = ref(false);
const disabled = ref(false);
const handleSizeChange = async (val) => {
  const res = await useTopPlaylist({ limit: val, offset: currentPage.value });
  console.log(res);
  store.playList = res;
};
const handleCurrentChange = async (val) => {
  const res = await useTopPlaylist({
    limit: pageSize.value,
    offset: (val - 1) * pageSize.value,
  });
  console.log(res);
  store.playList = res;
};
</script>

<style lang="scss" scoped></style>
