<!--  -->
<template>
 <div class="product">
    <Header :name='ref("商品详细").value'></Header>
    <div class="image">
        <img :src="`../../../public/images/meals/${state.list[0].id}.png`" alt="">
    </div>
    <div class="title">
        <h2>{{ state.list[0].title }}</h2>
        <counter style="color:red;margin-left: -40rem;font-size: 30rem;" :price="state.list[0].price" :meal="state.list[0]"/>
    </div>
    <div class="desc">
        <div class="header">
            详情
        </div>
        <div class="content">
            {{ state.list[0].desc }}
        </div>
    </div>
 </div>
</template>

<script setup>
import {reactive , toRefs ,ref} from 'vue'
import { useRoute } from 'vue-router';
import {useMealsStore} from '../../store/meals';
import Header from '../../components/Header/index.vue';
import counter from '../../components/Ul/counter.vue';
const meals = useMealsStore()
const state = reactive({
    id:1,
    list:[]
})
const route = useRoute()
state.id = route.params.id
state.list = meals.data.filter((item)=>{
    return item.id === state.id
})
console.log(state.list)
</script>
<style lang='less' scoped>
    .product{
        display: flex;
        flex-direction: column;
        padding:0rem 40rem;
        // background-color: #eee;
        .image{
            background-color: #fff;
            width: 80%;
            height: 450rem;
            margin: 0 auto;
            img{
                width: 100%;
            }
        }
        .title{
            h2{
                font-weight: 700;
                font-size: 35rem;
            }
            
        }
        .desc{
            margin-top: 20rem;
            border-top: 10rem solid #eee;
            padding-top: 10rem;
            .header{
                font-size: 30rem;
                width: 60rem;
                border-bottom: 3px solid red;
            }
            .content{
                margin-top: 20rem;
                font-size: 25rem;
            }
        }
    }
</style>