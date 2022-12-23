<template>
  <el-card>
    <div class="inline-block my-5" v-for="(item, i) in artists" :key="i">
      <el-image
        :src="item.picUrl"
        style="width: 300px; height: 167px"
        class="mr-8 rounded-md"
      ></el-image>
      <span
        class="block truncate cursor-pointer w-280px text-lg hover:underline"
        :title="item.name"
        >{{ item.name }}</span
      >
    </div></el-card
  >
</template>

<script setup>
import {} from "vue";
import { storeToRefs } from "pinia";
import { useArtistStore } from "~/store/artist";

const store = useArtistStore();
const { artists } = storeToRefs(store);
</script>

<style lang="scss" scoped></style>
