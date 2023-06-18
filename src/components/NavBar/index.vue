<!--  -->
<template>
 <div class="nav-bar">
    <ul class="nav-list">
        <router-link class="nav-list-item active" to="home">
            <i class="ri-store-2-line icon"></i>
            <span>首页</span>
        </router-link>
        <router-link class="nav-list-item card" to="card">
            <i class="ri-shopping-cart-2-line icon"></i>
            <!-- <span cl="itemcount">{{ total }}</span> -->
            <span>购物车</span>
        </router-link>
        <router-link class="nav-list-item active" to="user">
            <i class="ri-user-heart-fill icon"></i>
            <span>我的</span>
        </router-link>
    </ul>
 </div>
</template>

<script setup>
import {reactive , toRefs ,ref} from 'vue'
const props = defineProps(['total'])
</script>
<style lang='less' scoped>
@primary:rgb(248,188,0);
.nav-bar{
    position: fixed;
    left: 0;
    bottom:0;
    width: 100%;
    padding: 5px 0;
    z-index: 10000;
    background-color: #fff;
    .nav-list{
        display: flex;
        justify-content: space-around;
        align-items: center;
        .nav-list-item{
            display: flex;
            flex-direction: column;
            align-items: center;
            .icon{
                font-size: 40rem;
            }
            &.router-link-active{
                color:@primary
            }
            
        }
        
    }
}
</style>