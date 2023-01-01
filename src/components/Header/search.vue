<template>
  <el-select
    v-model="value"
    class="w-20%"
    filterable
    remote
    clearable
    reserve-keyword
    placeholder="请输入歌名、歌词、歌手或专辑"
    :remote-method="remoteMethod"
    :loading="loading"
  >
    <el-option
      v-for="item in store.searchHotDetail"
      :key="item.score || item.id"
      :label="item.searchWord || item.name"
      :value="item.score || item.id"
    />
  </el-select>
</template>

<script setup>
import { onMounted, ref } from "vue";
import { useSerchStore } from "~/store/serch";
import { storeToRefs } from "pinia";

const store = useSerchStore();
const {} = storeToRefs(store);
const value = ref();
const loading = ref(false);

onMounted(() => {
  store.getSearchHotDetail();
  store.getSearchSuggest();
});

const remoteMethod = (query) => {
  if (query) {
    console.log(query);
    loading.value = true;
    store.keywords = query;
    store.getSearchSuggest();
    loading.value = false;
  } else {
    store.getSearchHotDetail();
  }
};
</script>

<style lang="less" scoped></style>
