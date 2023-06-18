<script setup>
import { defineProps } from 'vue';
const props = defineProps(["isShow"]);
const emits = defineEmits(['hide'])
</script>
<template>
    <!-- 指定将组件渲染到网页的指定位置 -->
    <Teleport to="body">
        <div :="$attrs" class="mask" v-show="isShow" @click.self="emits('hide')">
        <slot></slot>
    </div>
    </Teleport>
</template>
<style scoped>
    .mask{
        position: fixed;
        left: 0;
        top: 0;
        bottom: 0;
        right: 0;
        background-color: rgba(0, 0, 0, 0.3);
        z-index: 9999;
    }
</style>