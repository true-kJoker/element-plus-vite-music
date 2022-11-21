<template>
  <el-card
    v-for="item in topHeader"
    class="w-45% inline-block ml-4 rounded-lg cursor-pointer text-center"
    :class="{ 'active-top': topId === item.id }"
    @click="checkoutRank(item.id)"
  >
    <span :class="{ 'text-white': topId === item.id }">
      {{ item.name }}
    </span>
  </el-card>
  <el-card
    v-for="item in rankList"
    :key="item.id"
    :class="{ 'active-rank': rankId === item.id }"
    class="w-45% inline-block ml-4 rounded-lg cursor-pointer text-center"
    @click="checkRank(item, item.id)"
  >
    <el-image
      :src="item.coverImgUrl"
      style="width: 45px; height: 45px"
      class="float-left mr-4 rounded-lg"
    ></el-image>
    <span class="block text-xl text-purple-600 truncate">{{ item.name }}</span>
    <span class="block">{{ item.updateFrequency }}</span>
  </el-card>
</template>

<script setup>
import { storeToRefs } from "pinia";
import { ref, onMounted } from "vue";
import { useRankStore } from "~/store/rank";

const store = useRankStore();
const { rankList } = storeToRefs(store);
const topHeader = ref([
  { id: "TOP", name: "特色榜" },
  { id: "Medio", name: "媒体榜" },
]);
onMounted(async () => {
  store.getTopListDetail();
  store.getPlayListTrackAll();
});

let topId = ref("TOP");
const checkoutRank = async (id) => {
  topId.value = id;
  if (id == "TOP") {
    store.rankList = store.topList;
    store.rank = store.rankList[0];
    rankId.value = store.rank.id;
    store.getPlayListTrackAll();
  } else {
    store.rankList = store.mediaList;
    store.rank = store.rankList[0];
    rankId.value = store.rank.id;
    store.getPlayListTrackAll();
  }
};

let rankId = ref(19723756);
const checkRank = async (item, id) => {
  rankId.value = id;
  store.rank = item;
  store.getPlayListTrackAll();
};
</script>

<style lang="less" scoped>
.active-rank {
  background: linear-gradient(135deg, #ffffff 20%, #ffb08e 100%);
}
.active-top {
  background-color: #ff641e;
  transition: background-color 0.8s ease-in;
}
</style>
