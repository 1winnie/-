<!--  -->
<template>
 <div class="createOrder">
    <Header :name="ref('生成订单').value"></Header>
    <div class="craete">
      <div class="info" @click="gotoedit">
            <div class="left">
                <span>{{state.address.userName}}&nbsp;{{  state.address.userPhone }}</span>
                <span>{{state.address.provinceName}}&nbsp;{{ state.address.cityName }}&nbsp;{{ state.address.regionName }}&nbsp;{{ state.address.detailAddress }}</span>
            </div>
            <div class="right">
                <i class="ri-arrow-right-s-line"></i>
            </div>
            <!-- <van-icon class="arrow" name="arrow" /> -->
     </div>
     <checkout></checkout>
    </div>
 </div>
</template>

<script setup>
import {reactive , toRefs ,ref} from 'vue'
import Header from '../../components/Header/index.vue'
import checkout from '../../components/Checkout/checkout.vue';
import { showLoadingToast, closeToast, showSuccessToast } from 'vant'
import { getDefaultAddress, getAddressDetail } from '../../api/address'
import { useRoute,useRouter } from 'vue-router';
const route = useRoute()
const router = useRouter()
const state = reactive({
    address:{}
})
const init = async () => {
    showLoadingToast({message:'加载中...',forbidClick: true})
    const {addressId} = route.query
    console.log(addressId)
    const { data: address } = addressId ? await getAddressDetail(addressId) : await getDefaultAddress()
    // if (!address) {
    //     router.push({ path: '/address' })
    //     return
    // }
    state.address = address
    console.log(state.address)
    closeToast()
}
init()
// 编辑地址
const gotoedit =()=>{
    router.push({path:'/address',query:{from:'create-order'}})
}
</script>
<style lang='less' scoped>
.createOrder{
    height: 100vh;
    overflow: hidden;
}
.craete{
    margin-top: 80rem;
    .info{
        width: 100%;
        padding: 40rem;
        display: flex;
        justify-content: space-between;
        align-items: center;
        background-color: #fff;
        border-bottom:1px dotted rgb(248,188,0);
        .left{
            display: flex;
            flex-direction: column;
            font-size: 35rem;
        }
        .right{
            font-size: 60rem;
        }
    }
}
checkout{
    margin-top: -150rem;
}
</style>