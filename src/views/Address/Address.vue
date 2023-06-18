<!--  -->
<template>
 <div class="adress">
    <Header :name="ref('地址管理').value" :back="state.from === 'create-order' ? '' : '/user'"></Header>
    <van-address-list
    v-model="state.chosenAddressId"
        :list="state.list"
        default-tag-text="默认"
        @add="onAdd"
        @edit="onEdit"
        @select="select"
      />

 </div>
</template>

<script setup>
import {reactive , toRefs ,ref, onMounted} from 'vue'
import Header from '../../components/Header/index.vue'
import { AddressList } from 'vant';
import {getAddressList} from '../../api/address';
import { useRouter,useRoute } from 'vue-router';
import { showLoadingToast ,closeToast} from 'vant'
const router = useRouter()
const route = useRoute()

const state = reactive({
    list:localStorage.getItem('address')?JSON.parse(localStorage.getItem('address')):[],
    chosenAddressId:'1',
    from: route?.query?.from ?? ''
})
onMounted(()=>{
    init()
})
const init = async () =>{
    showLoadingToast({message:'加载中...',forbidClick: true})
    const {data} = await getAddressList()
    if(!data){
        state.list = []
        return
    }
    closeToast()
    state.list = data.map(item => {
        return {
            id:item.addressId,
            name:item.userName,
            tel:item.userPhone,
            address: `${item.provinceName} ${item.cityName} ${item.regionName} ${item.detailAddress}`,
            isDefault: !!item.defaultFlag
        }
    })
    localStorage.setItem('address',JSON.stringify(state.list))
}

// 前往添加地址页面
const onAdd = () => {
  router.push({ path: 'address-edit', query: { type: 'add' } })
}
// 前往地址编辑页面
const onEdit = (item) => {
  router.push({ path: 'address-edit', query: { type: 'edit', addressId: item.id } })
}
// 选择某个地址后，跳回订单生成页面
const select = (item, index) => {
  router.push({ path: 'createorder', query: { addressId: item.id} })
}
</script>
<style lang='less' scoped>
    .add{
        width: 100%;
        background-color: rgb(248,188,0);
        color: #fff;
        font-weight: 700;
    }
    .van-address-list{
        margin-top: 100rem;
        
    }
    .address{
        .van-radio__icon {
        display: none;
        }
        .address-item {
        .van-button {
            background: rgb(248,188,0);
            border-color:rgb(248,188,0);
        }
        }
    }
</style>