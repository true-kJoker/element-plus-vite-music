<template>
  <el-card class="">
    <ul v-for="(item, i) in topCat" :key="i" class="flex">
      <span class="text-xl font-semibold">{{ item }}</span>
      <li v-for="cat in playListCat[i]">
        <el-button link class="ml-5">{{ cat.name }}</el-button>
      </li>
    </ul>
  </el-card>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { usePlayListCatList, useTopPlaylist } from "~/api/api";
import { usePlayListStore } from "~/store/playList";
import { storeToRefs } from "pinia";

const store = usePlayListStore();
const { playList } = storeToRefs(store);
let topCat = ref({});
let playListCat = ref([]);
onMounted(async () => {
  const res = await usePlayListCatList();
  topCat.value = res.categories;
  for (let index = 0; index < 5; index++) {
    let arr = [];
    res.sub.forEach((item) => {
      if (item.category == index) {
        arr.push(item);
      }
    });
    playListCat.value.push(arr);
    arr = [];
  }
  const playList = await useTopPlaylist({ limit: 18 });
  store.playList = playList;
});
</script>

<style lang="scss" scoped></style>
