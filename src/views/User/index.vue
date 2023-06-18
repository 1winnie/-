<!--  -->
<template>
 <div>
    <Header :name="ref('我的').value" :back="ref('/address').value"/>
    <div class="userPage">
      <div class="info">
         <div class="avator">
            <img src="../../assets/avator.jpg" alt="">
         </div>
         <div class="infomsg">
            <div>昵称：{{state.user.nickName}}</div>
            <div>登录名：{{state.user.loginName}}</div>
            <div>个性签名：早上好，海绵宝宝</div>
         </div>
      </div>
      <ul class="list">
         <li class="order" @click="goBack('/order')">
            <span>我的订单</span>
            <i class="ri-arrow-right-s-line"></i>
         </li>
         <li class="zhmanage" @click="goBack('/setting')">
            <span>账号管理</span>
            <i class="ri-arrow-right-s-line"></i>
         </li>
         <li class="dzmanage" @click="goBack('/address',{ from: 'mine' })">
            <span>地址管理</span>
            <i class="ri-arrow-right-s-line"></i>
         </li>
         <li class="aboutme" @click="goBack('/about')">
            <span>关于我们</span>
            <i class="ri-arrow-right-s-line"></i>
         </li>
      </ul>
    </div>
    <NavBar/>
 </div>
</template>

<script setup>
import {reactive , toRefs ,ref, onMounted,onActivated} from 'vue'
import NavBar from '../../components/NavBar/index.vue'
import Header from '../../components/Header/index.vue'
import { useRouter } from 'vue-router';
import {getUserInfo} from '../../api/user'
import { showLoadingToast ,closeToast} from 'vant'
const router = useRouter()
const state = reactive({
   user:{},
   loading:true
})
const getinfo = async() =>{
   showLoadingToast({message:'加载中...',forbidClick: true})
   const res = await getUserInfo()
   state.user = res.data
   closeToast()
}
onMounted(()=>{
   getinfo()
})
const goBack = (r,query) => {
   router.push({path:r,query:query || {}})
}

</script>
<style lang='less' scoped>
.userPage{
   display: flex;
   flex-direction: column;
   align-items: center;
   margin-top: 80rem;
}
.info{
   display: flex;
   align-items: center;
   width: 90%;
   height: 260rem;
   background-color: rgb(248,188,0);
  margin-top: 40rem;
   border-radius: 20rem;
   box-shadow: 0 5rem  10rem #ccc;
   .avator{
      width: 180rem;
      height: 180rem;
      border-radius: 50%;
      overflow: hidden;
      margin: 20rem;
      img{
         width: 100%;
         height: 100%;
      }
     
   }
   .infomsg{
         height: 140rem;
         display: flex;
         flex-direction: column;
         justify-content: space-between;
         font-size: 20rem;
         color: #fff;
         font-weight: 700;
      }
}
.list{
   width: 100%;
   margin-top:40rem;
   li{
      padding: 45rem;
      height: 80rem;
      width: 100%;
      line-height: 80rem;
      display: flex;
      align-items: center;
      justify-content: space-between;
      border-bottom: 1px solid #eee;
   }
}
</style>