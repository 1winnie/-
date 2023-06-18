<!--  -->
<template>
 <div class="order">
    <Header :name="ref('我的订单').value" :back="'/user'"></Header>
    <van-tabs @click-tab="onChangeTab"  v-model:active="active">
        <van-tab title="全部" name=''></van-tab>
        <van-tab title="待付款" name="0"></van-tab>
        <van-tab title="待确认" name="1"></van-tab>
        <van-tab title="待发货" name="2"></van-tab>
        <van-tab title="已发货" name="3"></van-tab>
        <van-tab title="交易完成" name="4"></van-tab>
    </van-tabs>
    <van-pull-refresh v-model="state.refreshing" @refresh="onRefresh">
        <van-list
            v-model:loading="state.loading"
            :finished="state.finished"
            finished-text="没有更多了"
            @load="onLoad"
            >
            <div v-for="item in state.orderlist" :key="item.id">
                <div class="time">
                <span>订单时间:{{ data }}</span>
                <span>已支付</span>
            </div>
            <van-card
                :num="item.count"
                :price="item.price"
                desc="蟹堡王汉堡"
                :title="item.title"
                :thumb="`../../../public/images/meals/${item.id}.png`"
             />
            </div>

        </van-list>
    </van-pull-refresh>
 </div>
</template>

<script setup>
import {reactive , toRefs ,ref, onMounted} from 'vue'
import Header from '../../components/Header/index.vue'
import { PullRefresh ,showToast, Tab, Tabs,Card } from 'vant';
import 'vant/es/toast/style';
import { List } from 'vant';
const active = ref(0);
const loading = ref(false);
const data = (new Date()).toLocaleString()
const state = reactive({
    orderlist:[],
    loading:false,//是否处于加载状态
    refreshing:false,
    finished:true//是否已加载完成
})

  state.orderlist = localStorage.getItem("buycart")? JSON.parse(localStorage.getItem("buycart")):[]
  console.log(state.orderlist)
const onChangeTab = ({ name }) => {
    console.log(name)
  // 这里 Tab 最好采用点击事件，@click，如果用 @change 事件，会默认进来执行一次。
  if(name == '' || name == '1'){
    state.orderlist = localStorage.getItem("buycart")?JSON.parse(localStorage.getItem("buycart")):[]
  }else{
    state.orderlist = []
  }
  state.status = name
  onRefresh()
}
// 滚动条与底部距离小于 offset 时触发
const onLoad = () =>{
    if(state.refreshing){
        state.refreshing = false
        state.finished = true
    }
}
// 下拉刷新时触发
const onRefresh = () => {
     state.refreshing = true
     state.finished = false
     state.loading = true
     state.page = 1
     onLoad()
};
</script>
<style lang='less' scoped>
.order{
    overflow: hidden;
}
.van-tabs{
    margin-top: 90rem;
}
.time{
    font-size: 30rem;
    padding: 0 40rem;
    display: flex;
    justify-content: space-between;
    img{
        width:60rem;

    }
}
.van-card{
    background-color: #fff;
}
.van-list{
    margin-top:40rem;
    overflow: scroll;
    height: calc(278rem * 4);
}
</style>