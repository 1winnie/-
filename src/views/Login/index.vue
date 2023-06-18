<!--  -->
<template>
 <div class="box">
    <Header :name="type === 'login' ? '登录':'注册'" :back="'/home'"></Header>
    <div v-if="type === 'login'" class="login-body">
      <img src="../../assets/login.webp" alt="">
        <van-form  @submit="OnSubmit">
      <van-cell-group inset>
        <van-field
          v-model="state.username"
          name="username"
          label="用户名"
          placeholder="用户名"
          :rules="[{ required: true, message: '请填写用户名' }]"
        />
        <van-field
          v-model="state.password"
          type="password"
          name="password"
          label="密码"
          placeholder="密码"
          :rules="[{ required: true, message: '请填写密码' }]"
        />
        <van-field
              center
              clearable
              label="验证码"
              placeholder="输入验证码"
              v-model="state.verify"
            >
              <template #button>
                <VueImageVerify ref="verifyRef" @imgCode="getCode"/>
              </template>
            </van-field>
      </van-cell-group>
      
      <div style="margin: 16px;">
        <div class="register" @click="toggle('register')">立即注册</div>
        <van-button round block  native-type="submit" >
          登录
        </van-button>
      </div>
        </van-form>
    </div>
    <div v-else class="login-body">
      <img src="../../assets/register.webp" alt="">
        <van-form  @submit="OnSubmit">
      <van-cell-group inset>
        <van-field
          v-model="state.username1"
          name="username1"
          label="用户名"
          placeholder="手机号"
          :rules="[{ required: true, message: '请填写用户名' }]"
        />
        <van-field
          v-model="state.password1"
          type="password"
          name="password1"
          label="密码"
          placeholder="密码"
          :rules="[{ required: true, message: '请填写密码' }]"
        />
        <van-field
              center
              clearable
              label="验证码"
              placeholder="输入验证码"
              v-model="state.verify"
            >
              <template #button>
                <VueImageVerify ref="verifyRef"  @imgCode="getCode"/>
              </template>
            </van-field>
      </van-cell-group>
      
      <div style="margin: 16px;">
        <div class="register" >
          <span @click="toggle('login')">已有登录账号</span>
        </div>
        <van-button round block type="primary" native-type="submit">
          注册
        </van-button>
      </div>
        </van-form>
    </div>
 </div>
</template>

<script setup>
import {reactive , toRefs ,ref,computed} from 'vue'
import Header from '../../components/Header/index.vue'
import VueImageVerify from '../../components/VueImageVerify.vue';
import { showSuccessToast, showFailToast } from 'vant';
import 'vant/es/toast/style';
import {login,register} from '../../api/user';
import md5 from 'js-md5';
const state = reactive({
   username:'',
   password:'',
   username1:'',
   password1:'',
   type:'login',//切换登录与注册模块
   verify:'',//绑定验证码
   name:'',
   imgCode: '',//验证码
})
const {type,username,password,imgCode} = toRefs(state)
const toggle = (v) => {
  type.value = v
  state.verify = ''
  // console.log(type.value)
//   name = computed(()=>{
//   return state.type === 'login' ? '登录':'注册'
// }).value
}
// 获取到随机生成的imgCode
const getCode = (code) => {
  imgCode.value = code
}
const verifyRef = ref(null)
// 提交登录或注册表单
const OnSubmit = async (values) =>{
  // console.log(verifyRef.value)
  if(state.verify.toLowerCase() != imgCode.value.toLowerCase()){
    showFailToast('验证码有误');
    return
  }
  if(type.value === 'login'){
      const res = await login(
        {
          "loginName":values.username,
          "passwordMd5":md5(values.password)
        })
        console.log(res)
        
        localStorage.setItem('token',res.data)
        showSuccessToast('登录成功');
        // // 需要刷新页面，否则 axios.js 文件里的 token 不会被重置
          window.location.href = '/'
  }else{
    const res = await register({
      "loginName":values.username1,
       "password":values.password1
    })
    if(res.data.resultCode === 200){
      showSuccessToast('注册成功');
      username.value = values.username1
      password.value = values.password1
      type.value = 'login'
      state.verify = ''
    }
  }

}
</script>
<style lang='less' scoped>
  .box{
    img{
      width: 100%;
      margin-top: 90rem;
    }
  }
  .van-form{
    margin-top: 50rem;
  }
  .register{
    margin: 20rem;
    margin-bottom: 40rem;
    font-size: 30rem;
    color:skyblue
  }
  .van-button{
    background-color: #1768a8;
    color: #e9f816;
    font-size: 40rem;
    font-weight: 700;
  }
  .van-field__button{
    margin-right: -40rem;
  }
</style>