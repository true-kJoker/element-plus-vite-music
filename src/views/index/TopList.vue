<template>
  <div class="flex space-x-10">
    <el-card shadow="always" v-for="item in playList" class="w-25%">
      <el-image
        :src="item.coverImgUrl"
        style="width: 100px; height: 100px"
      ></el-image>
    </el-card>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { usePlayListDetail } from "~/api/api";

const topList = ref([
  { id: 19723756, name: "飙升榜" },
  { id: 3779629, name: "新歌榜" },
  { id: 2884035, name: "原创榜" },
  { id: 3778678, name: "热歌榜" },
]);
const playList = ref([]);
onMounted(async () => {
  topList.value.forEach(async (item) => {
    const res = await usePlayListDetail(item.id);
    playList.value.push(res);
  });
});
</script>

<style lang="less" scoped></style>
