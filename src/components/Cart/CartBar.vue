<script setup>
import cartBag from "../../assets/bag.png"
import { useMealsStore } from "../../store/meals";
import { onMounted, ref } from "vue";
import { useRouter } from "vue-router";
import CartDetails from "./CartDetails.vue";
import Checkout from "../Checkout/checkout.vue";
import { showSuccessToast, showFailToast } from 'vant';
import 'vant/es/toast/style';

const meals = useMealsStore()
const showDetails = ref(true)
const showCheckout = ref(false)
const router = useRouter()
const goAddress = () => {
    if(meals.totalCount > 0){
        router.push('/address')
    }else{
        showFailToast({message:'未选购商品哦'})
    }
}
</script>
<template>
    <!-- Mask在cartDetails的中间中是根元素，可以通过透传属性进行传递 -->
    <CartDetails :is-show="showDetails" @hide="showDetails=false"></CartDetails>
    <div class="cart-bar">
        <div class="cart-bag">
            <img :src="cartBag" alt="">
            <span class="total-count">{{ meals.totalCount }}</span>
        </div>
        <div class="total-amount">
            <p v-show="!meals.totalCount || meals.totalCount<=0" class="no-goods">未选购商品</p>
            <p v-show="meals.totalCount > 0" class="has-goods" @click="showDetails=true">{{ meals.amount }}</p>
        </div>
        <button class="checkout-btn"  @click="goAddress">去结算</button>
    </div>
   
</template>
<style scoped>
.cart-bar{
    width: 710rem;
    height: 100rem;
    background-color: rgb(58, 58, 58);
    position: fixed;
    left: 0;
    right: 0;
    margin: 0 auto;
    bottom: 150rem;
    border-radius: 60rem;
    z-index: 9999;
}
.cart-bag{
    position: absolute;
    width: 100rem;
    bottom: -10rem;
}
.cart-bag img{
    width: 100%;
}
.total-count{
    background-color: red;
    border-radius: 50%;
    position: absolute;
    right: -22rem;
    top: 5rem;
   width: 38rem;
   text-align: center;
   line-height: 40rem;
    color: #fff;
    font-weight: bold;
}
.total-amount{
    line-height: 100rem;
    margin-left: 140rem;
}
.no-goods,.has-goods{
    color: rgb(148, 148, 148);
    font-size: 30rem;
    font-size: bold;
}
.has-goods{
    color: #fff;
}
.has-goods::before{
    content:"￥";
    font-size: 26rem;
}

.checkout-btn{
    position: absolute;
    top:0;
    right: 0rem;
    width:200rem;
    height: 100%;
    border-radius: 60rem;
    border: none;
    font-size: 36rem;
    background-color: rgb(248,188,0);
}
</style>