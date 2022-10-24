<template>
    <div class="flex mt-10 space-x-4">
        <div class=" w-70%">
            <Header />
            <Main />
        </div>
        <div class=" w-30%">
            <Aside />
        </div>
    </div>
</template>

<script setup>
import Aside from './Aside.vue'
import Header from './Header.vue'
import Main from './Main.vue'
</script>

<style lang="scss" scoped></style>
