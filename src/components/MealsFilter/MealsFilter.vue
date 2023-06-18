<script setup>
import { onMounted, reactive, toRefs} from 'vue';
import { useMealsStore } from '../../store/meals';
const state = reactive({
    isLogin:false
})
const {isLogin} = toRefs(state)
const meals = useMealsStore()
onMounted(()=>{
    const token = localStorage.getItem('token')
    if(token){
        isLogin.value = true
    }
})
</script>
<template>
    <div class="filter">
       <div class="filter-inner">
        <span class="title">蟹堡王</span>
        <input v-model="meals.keyword" class="filter-input" type="text" placeholder="请输入关键字">
        <i class="ri-search-2-line"></i>
        <div class="avater">
            <router-link class="login" tag="span" to="./login" v-if="!state.isLogin">登录</router-link>
            <router-link class="login" tag="span" to="./user" v-else>
                <i class="ri-user-line"></i>
            </router-link>
            
        </div>
    </div>
    </div>
</template>
<style scoped lang="less">
.filter{
  padding: 20rem 40rem;
  border-bottom: 1px solid #e6e6e6;
}
.filter-inner{
    position: relative;
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 80rem;
    .title{
        font-size: 40rem;
        font-weight: 700;
        color: rgb(248,188,0);
    }
   .avater{
    position: relative;
    //    flex: 1;
       margin-left: 20rem;
       width: 70rem;
       height: 70rem;
       border-radius: 50%;
       box-shadow: 0 0 5rem #ccc;
       text-align: center;
       line-height: 80rem;
        .login{
            position: absolute;
            top: -4rem;
            left: 6rem;
            width: 100%;
            height: 100%;
            // width: 100%;
            color: rgb(248,188,0);
            font-size: 8rem;
            font-weight: 700;
            .ri-user-line{
                position: absolute;
                left: 12rem;
                top: 0;
                font-size: 34rem;
                color:rgb(248,188,0)
            }
        }
   }
}

.filter-input{
    background-color: rgb(242,242,242);
    border: none;
    width: 60%;
    height: 100%;
    border-radius: 40rem;
    outline: none;
    padding: 0 40rem 0 80rem;
    font-size: 30rem;
}
.filter-inner i{
    position: absolute;
    color:rgb(184, 184, 184);
    font-size: 30rem;
    left: 170rem;
}
</style>