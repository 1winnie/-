<script setup>
import {ref} from 'vue'
import { useMealsStore } from '../../store/meals';

const meals = useMealsStore()

const props = defineProps(["price","meal"])
const price = props.price;

const throttle = (fn,delay) =>{
    let lastTime = 0//上一次触发的时间
    return function(){
        let nowTime = Date.now()
        if(nowTime - lastTime > delay){
            fn.apply(this)
            lastTime = nowTime
        }
    }
}
</script>
<template>
    <div class="counter">
        <div class="price">
            <i class="money">￥</i>
            {{ price }}</div>
        <div class="dian">
            <div v-if="props.meal.count >0" class="piont2" @click="throttle(meals.subMealFromCart(meal),500)">
            <i class="ri-subtract-line"></i>
        </div>
        <p v-if="props.meal.count>0">{{ props.meal.count }}</p>
        <div  class="piont1" @click="throttle(meals.addMealToCart(meal),1500)">
            <i class="ri-add-line"></i>
        </div>
        </div>
       
    </div>
</template>
<style scoped>
.counter{
    padding: 0 50rem;
    display: flex;
    align-items: center;
    justify-content: space-between;
    
}
.dian{
    display: flex;
    justify-content: center;
    align-items: center;
}
.piont1,.piont2{
   display: flex;
   justify-content: center;
   align-items: center;
    width: 25rem;
    height: 25rem;
    font-size: 10rem;
    background-color: rgb(234, 178, 0);
    border-radius: 50%;
}
p{
    margin: 0 15rem;
}
.piont2{
    background-color:#fff;
    border: 1px solid #000;
}
.price{
    font-size: 30rem;
    font-weight: 700;
}
.price .money{
    font-size: 6rem;
}
</style>