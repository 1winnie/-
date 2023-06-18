<!--  -->
<template>
 <div class="about">
    <Header :name="ref('关于我们').value"></Header>
    <img src="../../assets/about2.jpg" alt="">
    <div class="content">
        <div class="conduction">
            <span>简介</span>
            &nbsp&nbsp蟹老板所经营的蟹堡店，外观是一个捕蟹笼的模样，海绵宝宝、章鱼哥都是蟹堡王的员工（派大星是临时工），金哥、珍珍是蟹堡王的前员工；海绵宝宝和章鱼哥也当过代理店长，此餐厅多次被摧毁过，外表看起来又破又小，但里面有复杂的管道迷宫和蟹老板的偷窥室。
        </div>
        <div class="conduction">
            <span style="margin-left: -80rem">Krabby O’ Monday’s</span>
            员工：章鱼哥（Squidward），海绵宝宝（Spongebob），詹姆（已离开）
贩售：主要贩卖蟹黄堡（汉堡，一般由海绵宝宝任厨）和一些小食、饮料。
非常经历：众所周知，蟹老板是个极度十分贪恋钱的家伙。在第134集，他出外游历发现大饭店很赚钱，于是归来后把蟹堡王改造成高级饭店，成为蟹堡王大饭店。但是后来在轰鸣声中垮塌。又成为了原来的蟹堡王。
        </div>
    </div>
 </div>
</template>

<script lang='ts' setup>
import {reactive , toRefs ,ref} from 'vue'
import Header from '../../components/Header/index.vue'
</script>
<style lang='less' scoped>
img{
    width: 100%;
}
.content{
    display: flex;
    flex-direction: column;
    align-items: center;
    .conduction{
        margin-top: 20rem;
        width: 100%;
        position: relative;
        height: 350rem;
        border-top: 1px solid skyblue;
        padding-top: 30rem;
        font-size: 30rem;
        padding:  30rem;
        text-align: center;
        span{
            position: absolute;
            padding: 10rem;
            top: -30rem;
            left: 45%;
            background-color: #fff;
            font-size: 30rem;
            font-weight: 700;
            color: rgb(74, 230, 215);
        }
    }
}
</style>