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
    <el-option-group
      v-for="group in store.resultList"
      :key="group.label"
      :label="group.label"
    >
      <el-option
        v-for="item in group.options"
        :key="item.id || item.score"
        :label="item.name || item.searchWord"
        :value="item.id || item.score"
      />
    </el-option-group>
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
