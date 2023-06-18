<!--  -->
<template>
 <div class="setting">
    <Header :name="ref('账号管理').value"></Header>
    <div class="input-item">
      <van-field v-model="userinfo.nickName" label="昵称" />
      <van-field v-model="userinfo.introduceSign" label="个性签名" />
      <van-field v-model="userinfo.password" type='password' label="修改密码" />
    </div>
    <van-button round class="save-btn" color="rgb(248,188,0)" type="primary" @click="save" block>保存</van-button>
    <van-button round class="save-btn" color="rgb(248,188,0)" type="primary" @click="handleLogout" block>退出登录</van-button>
 </div>
</template>

<script setup>
import {reactive , toRefs ,ref} from 'vue'
import md5 from 'js-md5';
import {  showSuccessToast,showLoadingToast, closeToast} from 'vant';
import 'vant/es/toast/style';
import Header from '../../components/Header/index.vue'
import {getUserInfo,EditUserInfo,logout} from '../../api/user'
const state = reactive({
    userinfo:{
        nickName:'',
        introduceSign:"早上好，海面宝宝",
        password:""
    }
})
const {userinfo} = toRefs(state)
const UserInfo = async()=>{
    const {data} = await getUserInfo()
    state.userinfo.nickName = data.nickName
}
UserInfo()
// 点击保存
const save = async()=>{
    const params ={
        introduceSign: userinfo.value.introduceSign,
        nickName: userinfo.value.nickName,
        passwordMd5:''
    }
    if (userinfo.value.password) {
        params.passwordMd5 = userinfo.value.password
    }
    const res = EditUserInfo(params)
    showSuccessToast('保存成功')
}
// 点击退出登录
const handleLogout = async () =>{
    showLoadingToast({message:'加载中...',forbidClick: true})
    await logout()
   
        localStorage.setItem('token','')
        // 在当前页面打开url页面
        window.location.href = '/home'
        closeToast()
    
}
</script>
<style lang='less' scoped>
.input-item{
    margin-top: 90rem;
    margin-bottom: 200rem;
}
.save-btn{
   width: 80%;
   margin: 20rem auto;
   font-size: 35rem;
}
</style>