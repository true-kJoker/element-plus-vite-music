<template>
    <el-card>
        <div class="inline-block my-5" v-for="(item, i) in artists" :key="i">
            <el-image
                :src="item.picUrl"
                style="width: 20%; height: 20%"
                class="mr-8 rounded-md"
            ></el-image>
            <span
                class="block text-lg truncate cursor-pointer w-280px hover:underline"
                :title="item.name"
            >
                {{ item.name }}
            </span>
        </div>
    </el-card>
</template>

<script setup>
import {} from 'vue'
import { storeToRefs } from 'pinia'
import { useArtistStore } from '~/store/artist'

const store = useArtistStore()
const { artists } = storeToRefs(store)
</script>

<style lang="scss" scoped></style>
