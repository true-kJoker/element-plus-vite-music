<template>
    <el-card>aside</el-card>
</template>

<script setup>
import { onMounted } from 'vue'
import { useMyStore } from '~/store/my'

const store = useMyStore()
onMounted(() => {
    store.getArtistSublist()
    store.getMvsublist()
    store.getUserSubcount()
    store.getUserPlaylist()
})
</script>

<style lang="scss" scoped></style>
