<!--  -->
<template>
   <div class="dress">
        <Header :name="`${state.type==='add'?'新增地址':'编辑地址'}`"></Header>
        <van-address-edit
        :area-list="areaList"
        :addressInfo="state.addressInfo"
        show-delete
        show-set-default
        show-search-result
        :search-result="state.searchResult"
        :area-columns-placeholder="['请选择', '请选择', '请选择']"
        @save="onSave"
        @delete="onDelete"
        @change-detail="onChangeDetail"
        />
   </div>

</template>

<script setup>
import {reactive , toRefs ,ref, onMounted} from 'vue'
import { AddressEdit ,showSuccessToast,showToast} from 'vant';
import 'vant/es/toast/style';
import Header from '../../components//Header/index.vue'
import { useRoute,useRouter } from 'vue-router';
import { areaList } from '@vant/area-data';
import {getAddressDetail,addAddress,EditAddress} from '../../api/address'
import {DeleteAddress} from '../../api/address'
const route = useRoute()
const router = useRouter()
const state = reactive({
    areaList,
    type:'',
    addressId:'',
    addressInfo:{},
    searchResult:[]
})
onMounted(async()=>{
    console.log(route.query)
    state.type = route.query.type
    state.addressId = route.query.addressId
    if(state.type === 'edit'){
        const {data} = await getAddressDetail(state.addressId)
          state.addressInfo = {
              id: data.addressId,
              name: data.userName,
              tel: data.userPhone,
              province: data.provinceName,
              city: data.cityName,
              county: data.regionName,
              addressDetail: data.detailAddress,
              // areaCode: _areaCode,
              isDefault: !!data.defaultFlag
            }
     }
})
// 点击保存
const onSave =async (content) =>{
  
    const params = {
    userName: content.name,
    userPhone: content.tel,
    provinceName: content.province,
    cityName: content.city,
    regionName: content.county,
    detailAddress: content.addressDetail,
    defaultFlag: content.isDefault ? 1 : 0,
  }
  if (state.type == 'edit') {
    params['addressId'] = state.addressId
  }
 const res = await state.type == 'add' ? addAddress(params) : EditAddress(params)
//  console.log(res) 
 showToast('保存成功')
  setTimeout(() => {
    router.back()
  }, 1000)
}
// 点击删除
const onDelete = async() => {
  const res =await DeleteAddress(state.addressInfo.id)
  showSuccessToast("删除成功")
  setTimeout(()=>{
    router.push('/address')
  },1000)
}
</script>
<style lang='less' scoped>
.dress{
    overflow: hidden;
}
.van-form{
    margin-top: 100rem;
}
</style>