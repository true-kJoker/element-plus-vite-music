<template>
  <el-card>
    <div>
      <el-tag
        type="success"
        size="large"
        closable
        :disable-transitions="false"
        @close="handleClose"
        >{{ cat }}</el-tag
      >
    </div>
    <div
      class="inline-block mt-5 mr-8 h-280px"
      v-for="(item, i) in playList.playlists"
      :key="i"
    >
      <el-image
        :src="item.coverImgUrl"
        style="width: 220px; height: 220px"
        class="rounded-md"
      ></el-image>
      <span
        class="block truncate cursor-pointer w-220px text-lg hover:underline"
        :title="item.name"
        >{{ item.name }}</span
      >
      <div class="mt-1">
        <span class="text-black text-opacity-50">by</span>
        <span class="translate-x-2 inline-block cursor-pointer hover:underline">
          {{ item.creator.nickname }}
        </span>
      </div>
    </div>
    <el-pagination
      v-model:currentPage="currentPage"
      v-model:page-size="pageSize"
      :page-sizes="[18, 30, 60, 90]"
      :small="small"
      :disabled="disabled"
      :background="background"
      layout="total,sizes, prev, pager, next"
      :total="playList.total || 100"
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
const { cat, playList } = storeToRefs(store);
const currentPage = ref(1);
const pageSize = ref(18);
const small = ref(false);
const background = ref(false);
const disabled = ref(false);
const handleSizeChange = async (val) => {
  const res = await useTopPlaylist({
    limit: val,
    offset: (currentPage.value - 1) * val,
    cat: store.cat,
  });
  store.limit = val;
  store.offset = (currentPage.value - 1) * val;
  store.playList = res;
};
const handleCurrentChange = async (val) => {
  const res = await useTopPlaylist({
    limit: pageSize.value,
    offset: (val - 1) * pageSize.value,
    cat: store.cat,
  });
  store.limit = pageSize.value;
  store.offset = (val - 1) * pageSize.value;
  store.playList = res;
};
const handleClose = async () => {
  if (store.cat == "全部") {
    return true;
  } else {
    store.cat = "全部";
    const res = await useTopPlaylist({
      limit: store.limit,
      offset: store.offset,
      cat: store.cat,
    });
    store.playList = res;
  }
};
</script>

<style lang="scss" scoped></style>
