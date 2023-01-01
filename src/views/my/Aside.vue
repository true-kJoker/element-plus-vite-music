<template>
  <el-card
    v-for="(item, i) in userPlaylist"
    :class="{ 'active-rank': item.id === store.id }"
    class="mb-4 rounded-lg cursor-pointer text-center"
    @click="checkoutRank(item.id, i)"
  >
    <el-image
      :src="item.coverImgUrl"
      style="width: 45px; height: 45px"
      class="float-left mr-4 rounded-lg -translate-y-3"
    ></el-image
    >{{ item.name }}</el-card
  >
</template>

<script setup>
import { onMounted } from "vue";
import { useMyStore } from "~/store/my";
import { storeToRefs } from "pinia";

const store = useMyStore();
const { userPlaylist } = storeToRefs(store);
onMounted(() => {
  store.getArtistSublist();
  store.getMvsublist();
  store.getUserSubcount();
  store.getUserPlaylist();
  store.getPlayListTrackAll();
});
const checkoutRank = (id, i) => {
  console.log(id, i, store.id);
  store.id = id;
  store.playList = store.userPlaylist[i];
  store.getPlayListTrackAll();
};
</script>

<style lang="scss" scoped>
.active-rank {
  background: linear-gradient(135deg, #ffffff 20%, #ffb08e 100%);
}
</style>
