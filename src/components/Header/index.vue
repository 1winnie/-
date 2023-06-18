<!--  -->
<template>
    <header>
        <div class="left" @click="goback">
            <i class="ri-arrow-left-s-line"></i>
        </div>
        <div class="title">{{name}}</div>
        <div class="right">...</div>
    </header>
</template>

<script setup>
import {reactive , toRefs ,ref,watch} from 'vue'
import { useRouter } from 'vue-router';
const props = defineProps({
    name:'',
    back:'',
    noback:false
})

const isback = ref(props.noback)
const router = useRouter()
const goback = () => {
    if(!props.back){
        router.go(-1)
       
    }else{
        router.push({path: props.back})
    }
    
}


</script>
<style lang='less' scoped>
 header{
    position: fixed;
    left: 0;
    top: 0;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding:15px 10px;
    width:100%;
    height: 80rem;
    background-color: #fff;
    border-bottom: 1px solid #eee;
    z-index: 9999;
    .left{
        font-size: 60rem;
    }
    .right{
        margin-top: -20rem;
        font-size: 60rem;
        right: 0;
    }
    .title{
        font-size: 30rem;
    }
 }
</style>