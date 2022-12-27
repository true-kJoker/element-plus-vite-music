<template>
  <el-card>
    <div class="inline-block my-5" v-for="(item, i) in artists" :key="i">
      <el-image
        :src="item.picUrl"
        style="width: 300px; height: 20%"
        class="mr-8 rounded-md"
      ></el-image>
      <span
        class="block text-lg truncate cursor-pointer w-280px hover:underline"
        :title="item.name"
      >
        {{ item.name }}
      </span>
    </div>
    <el-pagination
      v-model:currentPage="currentPage"
      v-model:page-size="pageSize"
      :page-sizes="[18, 30, 60, 90]"
      :small="small"
      :disabled="disabled"
      :background="background"
      layout="total,sizes, prev, pager, next"
      :total="count || 100"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
    />
  </el-card>
</template>

<script setup>
import { ref } from "vue";
import { storeToRefs } from "pinia";
import { useArtistStore } from "~/store/artist";

const store = useArtistStore();
const { currentPage, count, artists } = storeToRefs(store);

const pageSize = ref(18);
const small = ref(false);
const background = ref(false);
const disabled = ref(false);
const handleSizeChange = (val) => {
  console.log(val, "handleSizeChange");
  store.pageData.limit = val;
  store.pageData.page = currentPage.value;
  store.getArtistList();
};
const handleCurrentChange = (val) => {
  console.log(val, "handleCurrentChange");
  store.pageData.limit = pageSize.value;
  store.pageData.page = val;
  store.getArtistList();
};
</script>

<style lang="scss" scoped></style>
