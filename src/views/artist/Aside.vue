<template>
  <el-card>aside</el-card>
</template>

<script setup>
import { onMounted } from "vue";
import { useArtistStore } from "~/store/artist";

const store = useArtistStore();
onMounted(() => {
  store.getArtistList();
});
</script>

<style lang="scss" scoped></style>
