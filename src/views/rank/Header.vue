<template>
  <el-image
    :src="rank.coverImgUrl"
    style="width: 250px; height: 250px"
    class="rounded-lg"
  ></el-image>
  <el-card class="inline-block w-75% float-right h-250px rounded-lg">
    <span>{{ rank.name }}</span>
    <span>更新时间{{ useFilterTime(rank.updateTime) }}</span>
    <span>播放次数{{ useNumberFormat(rank.playCount) }}</span>
    <span>收藏次数{{ useNumberFormat(rank.subscribedCount) }}</span>
    <span>歌单简介：</span>
    <span>{{ rank.description }}</span>
  </el-card>
</template>

<script setup>
import {} from "vue";
import { useRankStore } from "~/store/rank";
import { storeToRefs } from "pinia";
import { useNumberFormat, useFilterTime } from "~/utils/number";

const store = useRankStore();
const { rank } = storeToRefs(store);
</script>

<style lang="scss" scoped></style>
