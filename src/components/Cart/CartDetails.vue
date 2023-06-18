<script setup >
import Meals from '../Meals/Meals.vue';
import Mask from '../Ul/mask.vue';
import { useMealsStore } from '../../store/meals';
import Dialog from '../Ul/Dialog.vue';
import {reactive, ref,watch} from 'vue'
const emits = defineEmits()
const meals = useMealsStore()
const showDialog = ref(false);
// const state = reactive({
//     cardMeals:[]
// })


// if(localStorage.getItem('carMeals') != ''){
//     state.cardMeals = {...localStorage.getItem("cartMeals")}
// }
const okhHandler = ()=>{
    // 1.把购物车清空
    meals.clearCart()
    localStorage.setItem('cartMeals','')
    // 2.关闭dialog对话框
    // dialog自己去关闭
    // showDialog.value = false;
    // 关闭cartDetails
    // emits("hide")
}
</script>
<template>
    
    <!-- 插槽 -->
    <Mask style="z-index: 999">
        <!-- 对话框 -->
        <Dialog msg="确定要删除吗?" 
         @hide="showDialog = false"
         :is-show="showDialog" 
         @ok="okhHandler"
         ></Dialog>
        <div class="cart-details">
            <div class="header">
                <h2>餐品详情</h2>
                <a hraf="#" @click="showDialog = true">
                    <i class="ri-delete-bin-5-line"></i>
                    清空购物车
                </a>
            </div>
            <Meals class="meals" :desc="false" :meals="meals.CarMeals"></Meals>
        </div>
    </Mask>
</template>
<style scoped>
.cart-details{
    position: absolute;
    bottom: 0;
    width: 750rem;
    height: 100%;
    background-color: #fff;
    /* border-top-left-radius: 40rem;
    border-top-right-radius: 40rem; */
}
.meals{
    padding-top: 40rem;
    height: 880rem;
    overflow-y: auto;
}
.header{
    display: flex;
    justify-content: space-between;
    padding: 20rem 40rem;
    background-color: #fff;
    /* border-top-left-radius: 40rem;
    border-top-right-radius: 40rem; */
}
.header h2{
    font-size: 28rem;
}
.header a{
    display: flex;
    align-items: center;
    color: #9f9f9f;
    font-size: 22rem;
}
.header i{
    margin-right: 6rem;
    font-size: 26rem;
}
</style>