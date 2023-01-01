<template>
  <el-card
    v-for="item in userPlaylist"
    class="mb-4 rounded-lg cursor-pointer text-center"
    @click="checkoutRank(item.id)"
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
  store.getPlayListTrackAll()
});
const checkoutRank = (id) => {
  store.id = id;
  store.getPlayListTrackAll()
};
</script>

<style lang="scss" scoped></style>
