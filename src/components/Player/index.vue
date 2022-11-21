<template>
  <audio
    :src="songUrl"
    type="audio/mp3"
    controls="controls"
    class="absolute bottom-0 left-0"
  ></audio>
</template>

<script setup>
import { onMounted } from "vue";
import { storeToRefs } from "pinia";
import { usePlayerStore } from "~/store/player";

const store = usePlayerStore();
const { songUrl } = storeToRefs(store);
onMounted(() => {
  store.getSongUrl();
});
</script>

<style lang="scss" scoped></style>
