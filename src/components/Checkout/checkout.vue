<script setup>
import { useMealsStore } from '../../store/meals';
import {reactive} from 'vue'
import { showLoadingToast,showFailToast,closeToast, showSuccessToast } from 'vant'
import { getDefaultAddress, getAddressDetail } from '../../api/address'
import { useRoute, useRouter } from 'vue-router';
const props = defineProps(["isShow"])
const meals = useMealsStore()
const oldcard = localStorage.getItem("buycart")? JSON.parse(localStorage.getItem("buycart")):[]

console.log(oldcard)
const router = useRouter()
const route = useRoute()
const state = reactive({
  cartList: [],
  address: {},
  showPay: false,
  orderNo: '',
  cartItemIds: []
})
// 点击生成订单支付
const handlePayOrder = async(type)=>{
   if(meals.totalCount <= 0){
    showFailToast('还没有选购商品哦')
   }else{
    localStorage.setItem('buycart',JSON.stringify(meals.CarMeals.concat(oldcard)))
    localStorage.setItem('cartMeals','')
    meals.clearCart()
    showSuccessToast('支付成功')
    setTimeout(() => {
        router.push({ path: '/order' })
    }, 2000)
    }
}
// 点击取消支付
const close = () =>{
    router.push('/order')
}

</script>
<template>
    <div class="checkout">
        <div class="goods" >
            <div class="mealbox">
                <div class="meal" v-for="item in meals.CarMeals" :key="item.id">
                    <img :src="item.img" alt="item.title">
                    <div class="food">
                        <h2>{{ item.title }}</h2>
                        <div class="count">
                            <div class="bpiont">
                                <div class="piontsub" v-show="item.count > 0" @click="meals.subMealFromCart(item)">
                                    <i class="ri-subtract-line"></i>
                                </div>
                                <div class="counter">{{ item.count }}</div>
                                <div class="piontadd" @click="meals.addMealToCart(item)">
                                    <i class="ri-add-line"></i>
                                </div>
                            </div>
                            <div class="price">{{ item.price }}</div>
                        </div>
                    </div>
                </div>
                <div class="tip" v-show="meals.totalCount<=0">没有商品哦</div>
            </div>
            
            <div class="allspent">合计
                <span>{{meals.amount}}</span>
            </div>
        </div>
        <div class="spend">
            <div class="money" v-show="meals.totalCount>0">
                合计<p>{{ meals.amount }}</p>
            </div>
            <div class="nomoney" v-show="!meals.totalCount||meals.totalCount<=0">
                未选购商品
            </div>
            <div class="buy" @click="state.showPay = true">生成订单</div>
        </div>
    </div>
    <van-popup
      closeable
      :close-on-click-overlay="false"
      v-model:show="state.showPay"
      position="bottom"
      :style="{ height: '30%' }"
      @close="close"
    >
      <div :style="{ width: '90%', margin: '0 auto', padding: '50px 0' }">
        <van-button :style="{ marginBottom: '10px' }" color="#1989fa" block @click="handlePayOrder(1)">支付宝支付</van-button>
        <van-button color="#4fc08d" block @click="handlePayOrder(2)">微信支付</van-button>
      </div>
    </van-popup>
</template>
<style scoped>
    .checkout{
        background-color: #eee;
        position: relative;
        padding-top: 15rem;
        width: 100%;
        height: 1010rem;
    }
    i{
        margin: 8rem;
        font-weight: 700;
        font-size: 40rem;
    }
    .goods{
        position: relative;
        width: 740rem;
        background-color: #fff;
        border-radius: 40rem;
        position: absolute;
        top: 90rem;
        margin: 0 5rem;
        background-color: #fff;
    }
    .goodsheader{
        font-weight: 700;
        border-bottom: 1px dashed #eee;
        padding: 20rem;
    }
    .mealbox{
        display: flex;
        flex-direction: column;
        align-items: center;
        overflow: auto;
        height: auto;
        max-height: calc(160rem * 4);
        width: 680rem;
        height: auto;
        padding: 20rem;
        margin-top: 20rem;
    }
    .meal{
        display: flex;
        align-items: center;
        width:100%;
        height: 160rem;
       border-bottom: 1px dotted #eee;
    }
    .meal:last-child{
        border: none;
    }
    .meal img{
        width: 150rem;
        height: 150rem;
    }
    .tip{
        margin: 40rem 0;
        font-size: 50rem;
        color: #ccc;
    }
    .food{
        width: 480rem;
        height: 100%;
        display: flex;
        flex-direction: column;
        justify-content: space-around;
    }
    .count{
        display: flex;
        justify-content: space-between;
    }
    .bpiont{
        display: flex;
        align-items: center;
    }
    .bpiont i{
        font-size: 10rem;
    }
    div[class^="piont"]{
        display: flex;
        justify-content: center;
        align-items: center;
        width: 30rem;
        height: 30rem;
        border-radius: 50%;
        background-color: #fff;
        border: 1px solid #000;
        text-align: center;
    }
    .counter{
        margin: 0 10rem;
    }
   .bpiont .piontadd{
        background-color: yellow;
        border: none;
    }
    .price{
        font-size: 15rem;
        font-weight: 700;
    }
    .price::before{
        content: '￥';
        font-size: 5rem;
    }
    .allspent{
        position: relative;
        height: 140rem;
        line-height: 140rem;
        text-align: right;
        border-top: 1px dashed #eee;
        padding-right: 50rem;
    }
    .allspent::before,
    .allspent::after{
        content: '';
        position: absolute;
        width: 30rem;
        height: 30rem;
        background-color: #eee;
        border-radius: 50%;
        left: -15rem;
        top: -15rem;
    }
    .allspent::after{
        left:auto;
        right: -15rem;
    }
    .allspent span{
        font-size: 40rem;
        font-weight: 700;
    }
    .allspent span::before{
        content:'￥';
        font-size:5rem;
    }
    .spend{
        position: absolute;
        bottom: 0;
        display: flex;
        align-items: center;
        justify-content: space-between;
        bottom: 20rem;
        width: 710rem;
        height: 100rem;
        background-color: rgb(58, 58, 58);
        border-radius: 60rem;
        margin: 0 20rem;
        padding-left:30rem;
        overflow: hidden;
    }
    .money,.nomoney{
        display: flex;
        align-items:baseline;
        color: #fff;
        font-size: 10rem;
    }
    .money p{
        font-size: 40rem;
        font-weight: 700;
    }
    .money p::before{
        content: '￥';
        font-size: 10rem;
    }
    .buy{
        width: 250rem;
        height: 100%;
        line-height: 100rem;
        background-color: rgb(248,188,0);
        border-radius: 60rem;
        text-align: center;
        transform: translateX(1rem);
        font-size: 40rem;
    }
</style>