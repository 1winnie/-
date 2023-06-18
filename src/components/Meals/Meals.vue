<script setup>
import Meal from './Meal.vue';
// import {useMealsStore} from '../../store/meals'
// 加载store中的数据
//用meals接收store的数据，变成静态，只能显示原来已经有的数据，想动态显示商品显示不了
// const meals = useMealsStore()
// 用props接收，给它传什么数据，他就接收什么数据
// 以参数的形式传递，不再发生耦合
const props = defineProps(["meals"])

</script>
<template>
    <div class="meals">
        <!-- 显示商品信息 -->
        <Meal :desc="$attrs.desc" v-for="item in props.meals" :meal="item"/>
        <div class="nothing" v-if="!props.meals || props.meals.length === 0">
            <h2>没有匹配的商品哦</h2>
        </div>
    </div>
</template>
<style scoped>
/* 加了search组件会把body的高撑大，要是不触发body滚动，就要把search高度减去 */
    .meals{
        /* height: calc(100vh - 120rem); */
        padding-bottom: 160rem;
        background-color: #fff;
        /* overflow: auto; */
    }
    .nothing{
        margin: 400rem auto;
        width: 500rem;
        height: 100rem;
        text-align: center;
    }
    .nothing h2{
        font-size: 40rem;
        color: #ccc;
    }
</style>