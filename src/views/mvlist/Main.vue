<template>
  <el-card>
    <div class="inline-block my-5" v-for="(item, i) in mvAllData.data" :key="i">
      <el-image
        :src="item.cover"
        style="width: 300px; height: 167px"
        class="mr-8 rounded-md"
      ></el-image>
      <span
        class="block text-lg truncate cursor-pointer w-280px hover:underline"
        :title="item.name"
        >{{ item.name }}</span
      >
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
import { useMvListStore } from "~/store/mvlist";

const store = useMvListStore();
const { area, type, order, currentPage, count, mvAllData } = storeToRefs(store);
const pageSize = ref(18);
const small = ref(false);
const background = ref(false);
const disabled = ref(false);
const handleSizeChange = (val) => {
  store.limit = val;
  store.offset = (currentPage.value - 1) * val;
  store.getMvAll();
};
const handleCurrentChange = (val) => {
  store.limit = pageSize.value;
  store.offset = (val - 1) * pageSize.value;
  store.getMvAll();
};
const handleClose = (i) => {
  if (i == "area") {
    store.area = "全部";
  } else if (i == "type") {
    store.type = "全部";
  } else if (i == "order") {
    store.order = "上升最快";
  }
  store.getMvAll();
};
</script>

<style lang="scss" scoped></style>
